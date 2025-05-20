import { IStep } from "../../interfaces/models/IStep";
import { FaRegCircle, FaRegCircleCheck, FaRegCircleDot, FaRegCircleXmark } from "react-icons/fa6";
import { Status } from "../../enums/Status";

const GetChildStepsProgressCountStr = (step: IStep): string => {
    const totalChildSteps = step.steps.length;
    const completedSteps = step.steps.filter(s => s.status === Status.Completed).length;

    return `${completedSteps}/${totalChildSteps}`;
}

export function ProjectStatusContainer(props: {
    process?: IStep
}){
    if(!props.process) return <div>No status.</div>

    const childSteps = props.process.steps;

    return (
        <div className="flex flex-center margin-bottom">
            {childSteps.map((step) => 
                <div key={step.role} className="padding-smaller">
                    {step.status === Status.New && <div title={`${step.role} (Not Started)`}><FaRegCircle /></div>}
                    {step.status === Status.InProgress &&
                        <div className="color-blue" title={`${step.role} (In Progress - ${GetChildStepsProgressCountStr(step)})`}>
                            <FaRegCircleDot />
                        </div>
                    }
                    {step.status === Status.Completed && <div className="color-green" title={`${step.role} (Completed)`}><FaRegCircleCheck /></div>}
                    {step.status === Status.Failed && <div className="color-red" title={`${step.role} (Failed)`}><FaRegCircleXmark /></div>}
                </div>
            )}
        </div>
    );
}