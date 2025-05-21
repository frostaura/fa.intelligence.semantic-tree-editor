import styled from "styled-components";
import { GlobalAppHeaderContainer } from "../containers/GlobalAppHeaderContainer";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { GlobalAppHeaderContainerAction } from "@/enums/components/containers/GlobalAppHeaderContainerAction";
import { ChatInput } from "../input/ChatInput";
import { StateReducerActionType } from "@/enums/StateReducerActionTypes";
import { Routes } from "@/enums/Routes";
import { IProject } from "@/interfaces/models/IProject";

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

export function DirectorySelectorView() {
    const [state, reducer] = useContext(UserContext);
    const navigate = useNavigate();

    return(
        <StyledContainer className="size-full padding-double color-default flex flex-direction-column flex-center">
            <GlobalAppHeaderContainer action={GlobalAppHeaderContainerAction.AllProjects}/>
            <div className="size-full-width flex flex-spacer flex-center">
                <ChatInput
                    autoFocus={true}
                    placeholder="Describe a new project or select a directory."
                    allowDirectoryUploading={true}
                    onChange={(description, files, resetInput) => {
                        reducer?.({
                            type: StateReducerActionType.LoadProjectFromDirectory,
                            value: {
                                description: description,
                                files: files,
                                callback: (project: IProject) => {
                                    const navigationTarget = Routes.EditProject.replace(":projectId", project.id || "-1");

                                    resetInput();
                                    navigate(navigationTarget);
                                }
                            }
                        });
                    }}
                ></ChatInput>
            </div>
        </StyledContainer>
    );
}