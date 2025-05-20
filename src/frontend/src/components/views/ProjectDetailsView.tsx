import styled from "styled-components";
import { GlobalAppHeaderContainer } from "../containers/GlobalAppHeaderContainer";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import { GlobalAppHeaderContainerAction } from "../../enums/components/containers/GlobalAppHeaderContainerAction";
import { IProject } from "../../interfaces/models/IProject";
import { getAsync } from "../../services/data/ProjectsData";
import { LoadingShellContainer } from "../containers/LoadingShellContainer";
import { useEffectAsync } from "@/hooks/useAsyncEffect";
import { StepVisualizerContainer } from "../containers/StepVisualizerContainer";
import { IStep } from "@/interfaces/models/IStep";
import { RunAsync } from "@/services/engines/StepEngine";

const StyledContainer = styled.div`
`;

export function ProjectDetailsView() {
    const stateReducer = useContext(UserContext);
    const [state, reducer] = stateReducer;
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<IProject | null>(null);

    useEffectAsync(async () => {
        if(!id) setProject(null);

        setProject(await getAsync(parseInt(id || "-1"), state));
}, [id]);

    useEffectAsync(async () => {
        if(!project || !project.process) return;

        await RunAsync(project.process as IStep, project, stateReducer, true);
    }, [state.llmConfig, id]);

    return(
        <StyledContainer className="size-full padding-double color-default flex flex-direction-column">
            <GlobalAppHeaderContainer title={`Projects Details`} action={GlobalAppHeaderContainerAction.Back}/>
            <LoadingShellContainer loading={!project}>
                <StepVisualizerContainer step={project?.process as IStep} />
            </LoadingShellContainer>
        </StyledContainer>
    );
}