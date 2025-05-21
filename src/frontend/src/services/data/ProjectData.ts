import { IState } from "../../interfaces/state/IState";
import { IProject } from "@/interfaces/models/IProject";
import { IStateReducerAction } from "@/interfaces/state/IStateReducerAction";

export async function AddAsync(project: IProject, context: [IState, (React.Dispatch<IStateReducerAction> | undefined)?]): Promise<void>{
    if(!project || !project.description || !project.tree || (project.tree.children?.length || 0) <= 0) throw new Error('A valid project is required.');
    if(!context) throw new Error('A valid context is required.');

    console.debug(`[ProjectData][addAsync] Adding new project "${project.title}" (${project.description}).`);
}