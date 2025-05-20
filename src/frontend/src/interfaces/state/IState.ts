import { Views } from "../../enums/Views";
import { IProject } from "../models/IProject";
import { IStep } from "../models/IStep";
import { ILLMConfig } from "./ILLMConfig";
import { ISemanticEditorConfig } from "./ISemanticEditorConfig";
import { IUser } from "./IUser";

/**
 * The schema of the global state store.
 */
export interface IState{
    // Which main view in the application is currently active. Typically driven by routing.
    activeView: Views,
    // Contextual details about the operator of the system. - Currently-signed-in user.
    activeUser?: IUser,
    // A collection of all projects that the user has access to.
    projects: Array<IProject>,
    // Configuration for comms with the LLM.
    llmConfig?: ILLMConfig,
    // The number of new project examples to generate on the new project page / view.
    newProjectExamplesCount: number,
    // Configuration for the semantic editor component.
    semanticEditor: ISemanticEditorConfig,
    // The skeleton of the product development lifecycle that should be the baseline for newly generate projects.
    productDevelopmentLifecycle: Array<IStep>
    // Signatures are a collection of examples of interfaces we have since TS removes interfaces at compile time. This allows us to pass the signature of various objects into prompts so the system understands what properties should be present. Even the nullable ones.
    signatureExamples: {
        step: IStep
    }
}