import React, { useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    margin-bottom: var(--app-padding);
    padding-bottom: var(--app-padding);
    border-bottom: thin solid var(--app-background-color);
    transition: var(--app-transition);

    &.expanded{
        border-bottom: thin solid var(--app-color);
        transition: var(--app-transition);
    }

    &.collapsed .label{
        filter: brightness(0.5);
        transition: var(--app-transition);
    }

    &.expanded .label{
        font-weight: bold;
        filter: brightness(1);
        margin-bottom: var(--app-padding);
        transition: var(--app-transition);
    }
`;

export function ExpandableContainer(props: {
    label: string,
    expanded?: boolean,
    onChange?: (expanded: boolean) => void,
    children: React.ReactNode
}){
    const [expanded, setExpanded] = useState(props.expanded || false);

    return (
        <StyledContainer className={expanded ? "expanded" : "collapsed"}>
            <div className="label pointer smaller" onClick={() => setExpanded(!expanded)}>{props.label}</div>
            {
                expanded && 
                <div className="smallest">{props.children}</div>
            }
        </StyledContainer>
    );
}