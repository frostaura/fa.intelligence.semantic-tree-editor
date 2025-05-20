import { IStep } from "./IStep"
import { IUser } from "./IUser"

/**
 * A signature of a project model.
 */
export interface IProject{
    id?: number,
    title?: string,
    description: string,
    timestamp?: Date
    creator?: IUser,
    process?: IStep
}

export type { IStep }
