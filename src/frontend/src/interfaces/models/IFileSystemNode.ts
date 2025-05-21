/**
 * A signature for a tree node representing a file or directory.
 */
export interface IFileSystemNode{
    path: string,
    content?: string,
    children?: Array<IFileSystemNode>,
    parent?: IFileSystemNode
}