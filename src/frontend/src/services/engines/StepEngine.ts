import { ParameterTypes } from "@/enums/chat/ParameterTypes";
import { Languages } from "@/enums/semantic/Languages";
import { IFunction } from "@/interfaces/models/chat/IFunction";
import { IProject } from "@/interfaces/models/IProject";
import { IStep } from "@/interfaces/models/IStep";
import { IState } from "@/interfaces/state/IState";
import { IStateReducerAction } from "@/interfaces/state/IStateReducerAction";
import { stepExecutorPrompt } from "@/prompts/step.executor";
import { askAsync } from "../data/LLMData";
import { ModelTypes } from "@/enums/chat/ModelTypes";
import { StateReducerActionType } from "@/enums/StateReducerActionTypes";
import { Status } from "@/enums/Status";

function DetermineStatusForStepRecursively(step: IStep): Status{
    if(step.steps.length <= 0) return step.status;

    // Check if any children failed.
    const failedChildren = step.steps.filter(s => s.getStatus?.() === Status.Failed);

    if(failedChildren.length > 0) return Status.Failed;

    // Check if any children are in progress.
    const inProgressChildren = step.steps.filter(s => s.getStatus?.() === Status.InProgress);

    if(inProgressChildren.length > 0) return Status.InProgress;

    // Check if all children are completed.
    const completedChildren = step.steps.filter(s => s.getStatus?.() === Status.Completed);

    if(completedChildren.length === step.steps.length) return Status.Completed;

    // Else return new.
    return Status.New;
}

/**
 * Process a given step's children recursively to set the various context accessor like parents and output type defaults etc.  This mutates the original tree.
 * @param step The step to process.
 * @returns The updated step including the processed child steps.
 */
export function PopulateTreeContext(step: IStep): IStep{
    console.debug(`[StepEngine][PopulateTreeContext]: Populating tree context for step.`, step);

    step.outputType = step.outputType ?? Languages.Plaintext;
    step.requiresReasoning = step.requiresReasoning ?? false;
    step.getStatus = () => DetermineStatusForStepRecursively(step);

    step.steps.forEach(childStep => {
        childStep.outputType = childStep.outputType ?? step.outputType ?? Languages.Plaintext;
        childStep.requiresReasoning = childStep.requiresReasoning ?? step.requiresReasoning ?? false;
        childStep.getParent = () => step;
        childStep.getStatus = () => DetermineStatusForStepRecursively(childStep);

        PopulateTreeContext(childStep);
    });

    return step;
}

/**
 * Execute a given step and its children recursively down the chain.
 * @param step The step to execute on / from.
 * @param project The project the step is part of. This includes contextual information about the project idea.
 * @param stateReducer The global state as well as it's reducer.
 * @param skipPopulatedSteps Whether to skip steps that already have outputs populated.
 * @returns The step with the populated outputs where applicable.
 */
export async function RunAsync(step: IStep, project: IProject, stateReducer: [IState, (React.Dispatch<IStateReducerAction> | undefined)?], skipPopulatedSteps?: boolean): Promise<IStep>{
    console.debug(`[StepEngine][RunAsync]: Running from step "${GetStepAbsoluteKey(step)}".`);

    const stepAbsoluteKey = GetStepAbsoluteKey(step);
    const [state, reducer] = stateReducer;

    // If the current step is not a leaf node, continue down further.
    if(step.steps.length > 0){
        console.debug(`[StepEngine][RunAsync]: Step "${stepAbsoluteKey}" is not a leaf node. Processing children recursively.`);

        for (let s of step.steps)
            await RunAsync(s, project, stateReducer);

        return step;
    }else if (skipPopulatedSteps === true && !!step.output) console.debug(`[StepEngine][RunAsync]: Step "${stepAbsoluteKey}" is a leaf node but already has output. Skipping.`);
    else console.debug(`[StepEngine][RunAsync]: Step "${stepAbsoluteKey}" is a leaf node. Generating it's output.`);

    step.status = Status.InProgress;
    step.statusText = "The step engine has started processing this step.";
    reducer?.({
        type: StateReducerActionType.Refresh,
        value: null
    });

    const cleanedUpCurrentStep = {...step, output: "<PLACEHOLDER FOR YOUR RESPONSE>"};
    const prompt = stepExecutorPrompt
        .replace("{PDLC}", JSON.stringify(state.productDevelopmentLifecycle))
        .replace("{STEP_SIGNATURE}", JSON.stringify(state.signatureExamples.step))
        .replace("{PROJECT_NAME}", project.title ?? "Not provided yet.")
        .replace("{PROJECT_IDEA}", project.description)
        .replace("{CREATOR_EMAIL}", project.creator?.email ?? "Anonymous")
        .replace("{CREATION_TIME}", `${project.timestamp ?? "Not provided yet."}`)
        .replace("{CURRENT_STEP}", JSON.stringify(cleanedUpCurrentStep))
        .replace("{CURRENT_STEP_ABSOLUTE KEY}", stepAbsoluteKey);
    const functions: Array<IFunction> = [
        {
            name: "getStepByAbsoluteKey",
            description: "Get a step/node in the tree by it's fully qualified key.",
            parameters: [
                {
                    name: "absoluteKey",
                    description: "The fully qualified key to search for. Example: 'productDiscovery.introduction.projectOverview'.",
                    type: ParameterTypes.String,
                    required: true
                }
            ],
            call: async (args) => GetStepByAbsoluteKey(step, args["absoluteKey"])
        }
    ];

    await RunWithResilience(async () => {
        const output = await askAsync(ModelTypes.Full, prompt, state, functions);
        step.status = Status.Completed;
        step.statusText = "The step engine has successfully generated this step's output.";
    
        SetStepOutputByAbsoluteKey(step, stepAbsoluteKey, output);   
    },
    () => {
        step.status = Status.Failed;
        step.statusText = "The step engine has failed to generate this step's output.";
    },
    () => {
        reducer?.({
            type: StateReducerActionType.Refresh,
            value: null
        });  
    });

    return step;
}

/**
 * Get a given step in a tree by it's full key namespace.
 * @param step The step to search from.
 * @param key The fully qualified key to search for. Example: "productDiscovery.introduction.projectOverview".
 */
export function GetStepByAbsoluteKey(step: IStep, key: string): IStep{
    console.debug(`[StepEngine][GetStepByAbsoluteKey]: Getting step by absolute key "${key}".`, step);

    const segments = key.split(".");
    let currentStep = GetRootStep(step);

    do{
        const segment = segments.shift();

        if(currentStep.key === segment) continue;
        else currentStep = currentStep.steps.find(s => s.key === segment) as IStep;
    }
    while(segments.length > 0);

    return currentStep;
}

/**
 * Assign a new output value to a step by it's full key namespace. This mutates the original tree.
 * @param step The step to search from.
 * @param key The fully qualified key to modify for. Example: "productDiscovery.introduction.projectOverview".
 * @param value The new value of the output to assign to the step.
 */
export function SetStepOutputByAbsoluteKey(step: IStep, key: string, value: string): void{
    const root = GetRootStep(step);
    const currentStep = GetStepByAbsoluteKey(root, key);

    console.info(`[StepEngine][SetStepOutputByAbsoluteKey]: Set output for step by absolute key "${key}".`, step);

    currentStep.output = value;
}

/**
 * Get the top-level step in a tree given a current step.
 * @param step The step to traverse upwards from.
 * @returns The root-level step.
 */
export function GetRootStep(step: IStep): IStep{
    console.debug(`[StepEngine][GetRootStep]: Getting root step from step.`, step);

    let parent = step.getParent?.();

    if (!!parent) return GetRootStep(parent);

    // Already at the root node, return it.
    return step;
}

/**
 * Get a given step's absolute key for allowing access to the step via "SetStepOutputByAbsoluteKey".
 * @param step The step which's absolute key to determine.
 * @returns The step's absolute key.
 */
export function GetStepAbsoluteKey(step: IStep): string{
    console.debug(`[StepEngine][GetStepAbsoluteKey]: Getting absolute key for step.`, step);

    let parent = step.getParent?.();

    if (!!parent) return `${GetStepAbsoluteKey(parent)}.${step.key}`;

    // Already at the root node, return it.
    return step.key;
}

/**
 * Run an async workload with resilience.
 * @param work The async work delegrate to run.
 * @param onFail The funciton to execute at the end of the failure. This would be called after retries etc.
 * @param final The delegate to execute upon an exception's finally block.
 * @returns The async response of teh original work when it succeeds.
 */
export async function RunWithResilience<T>(work: () => Promise<T>, onFail: () => void, final: () => void): Promise<T>{
    // TODO: Add exponential backoff.

    try{
        return await work();
    }
    catch(e){
        onFail();
        throw e;
    }
    finally{
        final();
    }
}

/**
 * Export a given step to a markdown representation.
 * @param step The step to generate a markdown representation for.
 * @returns The markdown representation of the step.
 */
export function ExportStepToMarkdown(step: IStep): string{
    throw Error("Not Implemented"); 
}