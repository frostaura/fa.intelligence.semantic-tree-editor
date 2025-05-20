import { Views } from "../../enums/Views";
import { IProject } from "../models/IProject";
import { ILLMConfig } from "./ILLMConfig";
import { ISemanticEditorConfig } from "./ISemanticEditorConfig";
import { IUser } from "./IUser";

/**
 * The schema of the global state store.
 */
export interface IState{
    // Which main view in the application is currently active. Typically driven by routing.
    activeView: Views,
    // Contextual details about the operator of the system. - Currently-signed-in user.
    activeUser?: IUser,
    // A collection of all projects.
    projects?: Array<IProject>,
    // Configuration for comms with the LLM.
    llmConfig?: ILLMConfig,
    // Configuration for the semantic editor component.
    semanticEditor: ISemanticEditorConfig
}