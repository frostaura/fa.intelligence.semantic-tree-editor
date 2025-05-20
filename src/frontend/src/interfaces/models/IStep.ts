import { Languages } from "@/enums/semantic/Languages";
import { IStatus } from "./IStatus";
import { ReactNode } from "react";

/**
 * A signature for the atomic component of a pipeline step.
 */
export interface IStep extends IStatus {
    // The key of the step which can be leveraged to access the object at runtime.
    key: string,
    // The title or brief description of the step.
    role: string,
    // A collection of child steps, if any.
    steps: Array<IStep>,
    icon?: ReactNode,
    // The output from the step, if applicable.
    output?: string;
    // The type of content that resides in the output. Alowing for effective rendering and editing.
    outputType?: Languages,
    // Whether the particular step requires reasoning or not. This dictates what model may be used to process the step.
    requiresReasoning?: boolean,
    // A callback to get the parent context of the respective step, if any.
    getParent?: () => IStep | null,

    metadata?: {
        created: Date;
        modified?: Date;
        author?: string;
        tags?: string[];
        [key: string]: any;
      };
}