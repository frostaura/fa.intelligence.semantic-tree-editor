import styled from "styled-components";
import { ChatInput } from "../input/ChatInput";
import { GlobalAppHeaderContainer } from "../containers/GlobalAppHeaderContainer";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { askAsync } from "../../services/data/LLMData";
import { ModelTypes } from "../../enums/chat/ModelTypes";
import { newProjectIdeasPrompt } from "../../prompts/new.project_ideas";
import { IProjectExample } from "../../interfaces/prompt_signatures/IProjectExample";
import { createAsync } from "../../services/data/ProjectsData";
import { StateReducerActionType } from "../../enums/StateReducerActionTypes";
import { Routes } from "../../enums/Routes";
import { ProjectExamplesContainer } from "../containers/ProjectExamplesContainer";
import { GlobalAppHeaderContainerAction } from "../../enums/components/containers/GlobalAppHeaderContainerAction";
import { useEffectAsync } from "@/hooks/useAsyncEffect";
import { SemanticEditor } from "../input/SemanticEditor";
import { projectIdeaRefiningQuestions } from "@/prompts/edit.project_idea_refining_questions";
import { Languages } from "@/enums/semantic/Languages";

const StyledContainer = styled.div`
    & .min-width{
        min-width: 60%;
    }

    & .tag{
        background-color: var(--app-color-secondary);
        color: var(--app-background-color);
        font-weight: bold;
        padding: 0 calc(var(--app-padding) / 2);
    }
`;

export function NewProjectView() {
    const [state, reducer] = useContext(UserContext);
    const navigate = useNavigate();
    const [examples, setExamples] = useState<Array<IProjectExample>>([]);
    const [runningIdea, setRunningIdea] = useState<string>("");

    useEffectAsync(async () => {
        if(!state.llmConfig) return;

        const exampleProjectIdeasPrompt = newProjectIdeasPrompt.replace("{EXAMPLE_COUNT}", `${state.newProjectExamplesCount}`);
        const responseText = await askAsync(ModelTypes.Full, exampleProjectIdeasPrompt, state);

        setExamples(JSON.parse(responseText));
    }, [state]);

    return(
        <StyledContainer className="size-full padding-double color-default flex flex-direction-column flex-center">
            <GlobalAppHeaderContainer action={GlobalAppHeaderContainerAction.AllProjects}/>
            <div className="content flex flex-direction-column flex-center flex-spacer min-width">
                {runningIdea.length > 0 && 
                    <SemanticEditor
                        options={state.semanticEditor}
                        context={projectIdeaRefiningQuestions}
                        value={runningIdea}
                        onChange={(newValue: string) => console.log(`[SEMANTIC EDITOR]: ${newValue}`)}
                        language={Languages.Markdown}
                        askLLMAsync={askAsync}
                        height="55vh"
                    />
                }
                {runningIdea.length <= 0 &&
                    <>
                        <ProjectExamplesContainer examples={examples}/>
                        <ChatInput
                            placeholder="Describe your idea"
                            onChange={async (text, resetInput) => {
                                // const newInitiative = await createAsync({
                                //     description: text
                                // });

                                // reducer?.({
                                //     type: StateReducerActionType.AddNewProject,
                                //     value: newInitiative
                                // });
                                // navigate(Routes.ProjectDetailsView.replace(":id", `${newInitiative.id}`));
                                setRunningIdea(text);
                                resetInput();
                            }}/>
                    </>
                }
                <div className="padding-top-double color-secondary flex flex-center smaller no-select">
                    <div className="tag margin-right-half border-radius">ALPHA</div>
                    Accelerator may create unexpected results.
                </div>
            </div>
        </StyledContainer>
    );
}