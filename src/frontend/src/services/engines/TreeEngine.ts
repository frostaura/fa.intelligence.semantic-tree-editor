import { IFile } from "@/interfaces/models/IFile";
import { IFileSystemNode } from "@/interfaces/models/IFileSystemNode";

/**
 * Take a collection of files and build a tree structure out of it.
 * @param files A collection of files to process.
 * @returns A tree structure that represents the files.
 */
export function BuildTreeFromFiles(files: Array<IFile>): Array<IFileSystemNode> {
    const nodes: Array<IFileSystemNode> = [];

    files
        .forEach((f: IFile) => {
            const shouldUseWindowsPaths = f.path.includes("\\");
            const pathSegments = f
                .path
                .split(shouldUseWindowsPaths ? "\\" : "/");
            const directorySegments = pathSegments.slice(0, pathSegments.length - 1);
            const fileSegment = pathSegments[pathSegments.length - 1];
            let currentNode: IFileSystemNode = nodes.length > 0 ? nodes[0] : {
                path: directorySegments[0],
                children: []
            };

            if (nodes.length <= 0) nodes.push(currentNode);
            if (directorySegments.length <= 1) return;

            for(let i = 1; i < directorySegments.length; i++){
                // Get the segment name.
                const directorySegment = directorySegments[i];

                // Create a file system node.
                const directoryNode: IFileSystemNode = {
                    path: directorySegment,
                    children: [],
                    parent: currentNode
                }

                // Try to fetch the current segment from the current children. If exists, override the above.
                const existingDirectoryNode = currentNode.children?.find(c => c.path == directorySegment); 
                
                // Add this segment if it doesn't already exist.
                if(!existingDirectoryNode){
                    currentNode.children = currentNode.children || [];
                    currentNode.children?.push(directoryNode);

                    currentNode = directoryNode;
                }else{
                    currentNode = existingDirectoryNode;
                }
            }

            const fileNode: IFileSystemNode = {
                path: fileSegment,
                children: [],
                content: f.content,
                parent: currentNode
            }
            currentNode.children = currentNode.children || []

            currentNode.children.push(fileNode);
        });

    return nodes;
}