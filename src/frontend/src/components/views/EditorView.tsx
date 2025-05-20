import styled from "styled-components";
import { GlobalAppHeaderContainer } from "../containers/GlobalAppHeaderContainer";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { askAsync } from "../../services/data/LLMData";
import { ModelTypes } from "../../enums/chat/ModelTypes";
import { useEffectAsync } from "@/hooks/useAsyncEffect";
import { GlobalAppHeaderContainerAction } from "@/enums/components/containers/GlobalAppHeaderContainerAction";
import { Key } from "antd/es/table/interface";
import { DataNode } from "antd/es/tree";

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

export function EditorView(props: {
    projectId?: string
}) {
    const [state, reducer] = useContext(UserContext);
    const navigate = useNavigate();
    const [examples, setExamples] = useState<Array<any>>([]);
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
            {/* <Tree
                onExpand={(e) => setExpandedKeys(e)}
                expandedKeys={expandedKeys}
                autoExpandParent
                treeData={data}
            /> */}
        </StyledContainer>
    );
}