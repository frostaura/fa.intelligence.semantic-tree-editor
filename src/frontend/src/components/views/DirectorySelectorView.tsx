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
    const [files, setFiles] = useState<File[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<Array<Key>>([]);
    const data: Array<DataNode> = [
        {
            key: "node_1",
            title: <span>Node 1</span>,
            children: [
                {
                    key: "node_1.1",
                    title: <span>Node 1.1</span>
                },
                {
                    key: "node_1.2",
                    title: <span>Node 1.2</span>
                }
            ]
        },
        {
            key: "node_2",
            title: <span>Node 2</span>
        },
        {
            key: "node_3",
            title: <span>Node 3</span>,
            children: [
                {
                    key: "node_3.1",
                    title: <span>Node 3.1</span>
                },
                {
                    key: "node_3.2",
                    title: <span>Node 3.2</span>
                }
            ]
        },
    ];
    const handleDirectorySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;

        if (!fileList) return;

        // Convert FileList to an array
        const filesArray = Array.from(fileList);
        setFiles(filesArray);

        // For demonstration, log file names
        console.log("Selected files:", filesArray.map(f => f.webkitRelativePath || f.name));
    };

    return(
        <StyledContainer className="size-full padding-double color-default flex flex-direction-column flex-center">
            <GlobalAppHeaderContainer action={GlobalAppHeaderContainerAction.AllProjects}/>
            {/* <div className="flex-spacer">
                Select Directory
                <input
                    type="file"
                    multiple
                    onChange={handleDirectorySelect}
                    {...({ webkitdirectory: "true", directory: "true" } as any)}
                />
            </div> */}
            <div className="size-full-width flex flex-spacer flex-center">
                {/* <Tree
                    onExpand={(e) => setExpandedKeys(e)}
                    expandedKeys={expandedKeys}
                    autoExpandParent
                    treeData={data}
                /> */}
                <ChatInput
                    autoFocus={true}
                    placeholder="Describe a new project or select a directory."
                    allowDirectoryUploading={true}
                ></ChatInput>
            </div>
        </StyledContainer>
    );
}