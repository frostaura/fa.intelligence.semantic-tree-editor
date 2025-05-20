import { ReactNode } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    & {
        position: relative;
        background: linear-gradient(
            90deg,
            var(--app-background-secondary) 25%,
            var(--app-background-color) 50%,
            var(--app-background-secondary) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 3s infinite;
    }

    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
`;

export function LoadingShellContainer(props: {
    children: ReactNode,
    loading: boolean
}){
    if(props.loading) return (
        <StyledContainer className="rounded background-color-secondary flex-spacer" />
    );

    return props.children;
}