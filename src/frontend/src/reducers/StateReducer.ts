import { IProject } from "@/interfaces/models/IProject";
import { StateReducerActionType } from "../enums/StateReducerActionTypes";
import { IState } from "../interfaces/state/IState";
import { IStateReducerAction } from "../interfaces/state/IStateReducerAction";

/**
 * Augment the global state based on the provided action.
 * @param state The current state, of the global state object.
 * @param action The augmentation action to perform on the global state.
 * @returns The updated global state.
 */
export const StateReducer = (state: IState, action: IStateReducerAction): IState => {
    console.debug(`[UPDATE][REDUCER][${StateReducerActionType[action.type]}]: `, action.value);

    switch(action.type){
        // Load the initial state from appsettings.json-provided state content. This implies that the appsettings.json
        case StateReducerActionType.SetInitialState:
            return {
                ...state,
                ...action.value
            };
        // Load a project from files.
        case StateReducerActionType.LoadProjectFromDirectory:
            const loadProjectFromDirectoryCallback = action.value.callback;
            const loadProjectFromDirectoryFiles = action.value.files;
            const loadProjectFromDirectoryDescription = action.value.description
            const loadedProject: IProject = {
                description: loadProjectFromDirectoryDescription,
                processing: true
            }
            const fileReadTasks = loadProjectFromDirectoryFiles
                .map((f: File) =>
                    new Promise<{ path: string, content: string }>((resolve, reject) => {
                        const reader = new FileReader();

                        reader.onload = () => {
                            resolve({
                                path: (f as any).webkitRelativePath || f.name,
                                content: reader.result as string,
                            });
                        };
                        reader.onerror = () => {
                            reject(reader.error);
                        };
                        reader.readAsText(f);
                    })
                );
            debugger;
            Promise
                .all(fileReadTasks)
                .then((results: Array<{ path: string, content: string }>) => {
                    debugger;
                    loadProjectFromDirectoryCallback?.(loadedProject);
                }).catch((error) => {
                    console.error("Error reading files", error);
                });

            return {
                ...state,
                projects: [
                    ...state.projects || [],
                    loadedProject
                ]
            }
        // Simply set the state to a copy of it's current self which should trigger a re-render without changing the underlying state.
        case StateReducerActionType.Refresh:
        default:
            return {...state};
    }
}