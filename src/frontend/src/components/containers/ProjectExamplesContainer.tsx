import styled from "styled-components";
import { IProjectExample } from "../../interfaces/prompt_signatures/IProjectExample";
import { FaSpinner } from "react-icons/fa";

const StyledContainer = styled.div`
    flex-wrap: wrap;
    max-width: 600px;

    & .example{
        width: 250px;
        height: 125px;
    }
`;

export function ProjectExamplesContainer(props: {
    examples: Array<IProjectExample>
}){
    if(props.examples.length <= 0) return(
    <div className="flex flex-center margin-bottom">
        <FaSpinner className="spin" />
    </div>)

    return (
        <StyledContainer className="flex flex-center margin-bottom">
            {props.examples.map((example) =>
                <div key={example.title} className="example background-color-secondary margin-half padding rounded flex flex-column flex-center-vertical">
                    <div className="color-secondary smaller">{example.title}</div>
                    <div className="smallest">{example.prompt}</div>
                </div>
            )}
        </StyledContainer>
    );
}