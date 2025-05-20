import { Status } from "@/enums/Status";
import { IStep } from "@/interfaces/models/IStep";
import { FaRegCircle, FaRegCircleDot, FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import styled from "styled-components";

const StyledContainer = styled.div`
`;

export function StepVisualizerContainer(props: {
    step: IStep
}){
    const stepStatus = props.step.getStatus?.() || Status.New;

    return (
        <StyledContainer>
            <div className="flex pointer" title={props.step.output} onClick={() => {
                if(!props.step.output || props.step.output.length <= 0){
                    alert("No output to display. Parent nodes have no output, try a lead node step instead. Alternatively the step may not have run yet.");
                    return;
                }

                alert(props.step.output);
            }}>
                {stepStatus === Status.New && <div title={`${props.step.role} (Not Started)`}><FaRegCircle /></div>}
                {stepStatus === Status.InProgress &&
                    <div className="color-blue" title={`${props.step.role}`}>
                        <FaRegCircleDot />
                    </div>
                }
                {stepStatus === Status.Completed && <div className="color-green" title={`${props.step.role} (Completed)`}><FaRegCircleCheck /></div>}
                {stepStatus === Status.Failed && <div className="color-red" title={`${props.step.role} (Failed)`}><FaRegCircleXmark /></div>}
                <div className="margin-left">{props.step.steps.length <= 0 ? props.step.role : `${props.step.role} (${props.step.steps.filter(s => s.getStatus?.() == Status.Completed).length}/${props.step.steps.length})`}</div>
            </div>
            <div className="children margin-left">
                {props.step.steps.map(cs => <StepVisualizerContainer key={cs.role} step={cs} />)}
            </div>
        </StyledContainer>
    );
}