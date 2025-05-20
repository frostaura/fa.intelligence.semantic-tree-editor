import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import { MagicAnimationContainerModes } from "../../enums/components/containers/MagicAnimationContainerModes";

const StyledContainer = styled.div`
    position: relative;
    display: inline-flex;
    z-index: 1;

    @keyframes glow-animation {
        0% {
            filter: blur(10px);
        }
        50% {
            filter: blur(15px);
        }
        100% {
            filter: blur(10px);
        }
    }

    &.animate::before,
    &.animate-on-hover:hover::before,
    &.animate-on-true.value-true::before,
    &.animate::after,
    &.animate-on-hover:hover::after,
    &.animate-on-true.value-true::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: conic-gradient(
            from var(--angle, 0deg),
            #3b82f6,
            #8b5cf6,
            #ec4899
        );
        border-radius: var(--app-border-radius);
        animation: glow-animation 10s linear infinite;
        z-index: 0;
    }

    & > * {
        z-index: 1;
    }
`;

export function MagicAnimationContainer(props: {
    children: ReactNode,
    mode: MagicAnimationContainerModes,
    value?: boolean
}) {
    const glowingContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 0;
        const animationTimeInMs = 20000; // Increased from 10000 to 20000
        const animationAngle = 360;
        const interval = setInterval(() => {
            if (angle >= 360) angle = 0;
            else angle += 1;

            if (glowingContainerRef.current) {
                glowingContainerRef.current.style.setProperty("--angle", `${angle}deg`);
            }
        }, animationTimeInMs / animationAngle);

        return () => clearInterval(interval);
    }, []);

    return (
        <StyledContainer
            className={(props.mode) + " size-full-width flex value-" + (props.value ?? false)}
            ref={glowingContainerRef}>
            <div className="size-full-width">
                {props.children}
            </div>
        </StyledContainer>
    );
}