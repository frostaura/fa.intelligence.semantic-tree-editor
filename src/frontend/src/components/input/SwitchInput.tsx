import { useState } from "react";
import { styled } from "styled-components";

const StyledContainer = styled.div`
    display: inline-flex;

    & .switch {
        position: relative;
        width: calc(var(--app-border-radius) * 1.65);
        height: 20px;
        border-radius: calc(var(--app-border-radius) * 6);
        margin-right: calc(var(--app-padding) / 2);
        background-color: var(--app-background-secondary);
        cursor: pointer;
        transition: background-color var(--app-transition);
    }

    &.flex-row-reverse .switch{
        margin-right: 0;
        margin-left: calc(var(--app-padding) / 2);
    }

    &.enabled .switch {
        background-color: var(--app-color);
    }

    & .indicator {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: var(--app-color);
        transform: translateX(0);
        transition: transform var(--app-transition), background-color var(--app-transition);
    }

    &.enabled .indicator {
        background-color: var(--app-background-secondary);
        transform: translateX(calc(var(--app-border-radius) * 1.65 - 19px));
    }

    &.disabled .indicator {
        background-color: var(--app-color);
        transform: translateX(0);
    }
`;

export function SwitchInput(props: {
    value: boolean;
    onChange?: (enabled: boolean) => void;
    label: string;
    reverseOrientation?: boolean;
}) {
    const [enabled, setEnabled] = useState(props.value);
    const handleChange = (enabled: boolean) => {
        setEnabled(enabled);
        props.onChange?.(enabled);
    };
    const reverseOrientation = props.reverseOrientation ?? false;

    return (
        <StyledContainer
            className={`flex flex-center pointer ${enabled ? "enabled " : "disabled "} ${reverseOrientation ? "flex-row-reverse" : ""}`}
            onClick={() => handleChange(!enabled)}>
            <div className="switch flex flex-center-horizontal">
                <div className="indicator" />
            </div>
            <div>{props.label}</div>
        </StyledContainer>
    );
}
