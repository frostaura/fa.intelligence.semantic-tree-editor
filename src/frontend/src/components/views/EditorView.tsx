import styled from "styled-components";
import { GlobalAppHeaderContainer } from "../containers/GlobalAppHeaderContainer";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { askAsync } from "../../services/data/LLMData";
import { ModelTypes } from "../../enums/chat/ModelTypes";
import { useEffectAsync } from "@/hooks/useAsyncEffect";
import { GlobalAppHeaderContainerAction } from "@/enums/components/containers/GlobalAppHeaderContainerAction";

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

export function EditorView() {
    const [state, reducer] = useContext(UserContext);
    const navigate = useNavigate();
    const [examples, setExamples] = useState<Array<any>>([]);

    useEffectAsync(async () => {
        if(!state.llmConfig) return;

        //const exampleProjectIdeasPrompt = "What is the meaning of life?";
        //const responseText = await askAsync(ModelTypes.Full, exampleProjectIdeasPrompt, state);

        //setExamples(JSON.parse(responseText));
    }, [state]);

    return(
        <StyledContainer className="size-full padding-double color-default flex flex-direction-column flex-center">
            <GlobalAppHeaderContainer action={GlobalAppHeaderContainerAction.NewProject}/>
            <div>Editor here...</div>
        </StyledContainer>
    );
}