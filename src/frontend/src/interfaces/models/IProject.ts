import { IFileSystemNode } from "./IFileSystemNode";

/**
 * A signature for a project.
 */
export interface IProject{
    id?: string,
    title?: string,
    description: string,
    processing?: boolean,
    tree?: IFileSystemNode
}