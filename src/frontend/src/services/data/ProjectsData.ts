import { IProject } from "../../interfaces/models/IProject";
import { IState } from "../../interfaces/state/IState";

/**
 * Create a new project.
 * @param project The project to create.
 * @returns The created project model.
 */
export async function createAsync(project: IProject): Promise<IProject> {
    // TODO: Wire this up to the API.

    // For the sake of testing, assing an arbitrary id to the project.
    project.id = Math.floor(Math.random() * 1000);

    return new Promise<IProject>((resolve, reject) => {
        // For the sake of testing, simulate a delay before resolving.
        resolve(project);
    });
}

/**
 * Get a project by its unique id from the global state first and refresh the state of the project in the background from the API.
 * @param id The unique project id to get.
 * @param state The global state.
 * @returns The project context for the project with the provided id.
 */
export async function getAsync(id: number, state: IState): Promise<IProject | null> {
    if(id === -1) return null;

    const project = state.projects.find(p => p.id === id);

    if (project) {
        // TODO: Refresh the project context from the API.

        return project;
    }else{
        return null;
        throw new Error("TODO: Fetch the project from the API.");
    }
}