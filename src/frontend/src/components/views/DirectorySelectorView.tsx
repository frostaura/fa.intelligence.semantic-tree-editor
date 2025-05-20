import styled from "styled-components";
import { GlobalAppHeaderContainer } from "../containers/GlobalAppHeaderContainer";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { askAsync } from "../../services/data/LLMData";
import { ModelTypes } from "../../enums/chat/ModelTypes";
import { useEffectAsync } from "@/hooks/useAsyncEffect";
import { GlobalAppHeaderContainerAction } from "@/enums/components/containers/GlobalAppHeaderContainerAction";
import { Tree } from 'antd';
import { DataNode } from "antd/es/tree";
import { Key } from "antd/es/table/interface";
import Search from "antd/es/input/Search";
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
                    placeholder="Describe a new project and select a directory."
                    allowDirectoryUploading={true}
                    onChange={(description, files, resetInput) => {
                        debugger;
                        reducer?.({
                            type: StateReducerActionType.LoadProjectFromDirectory,
                            value: {
                                description: description,
                                files: files,
                                callback: (project: IProject) => navigate(Routes.EditProject.replace(":projectId", project.id || ""))
                            }
                        });
                        resetInput();
                    }}
                ></ChatInput>
            </div>
        </StyledContainer>
    );
}