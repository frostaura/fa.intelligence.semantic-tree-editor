import { Status } from "../../enums/Status";

/**
 * A signature for the component that has status updates.
 */
export interface IStatus{
    // The status of the step.
    status: Status,
    // The status message, if applicable.
    statusText?: string,
    // A function to get the status of a step. This function takes into consideration the children in a given step.
    getStatus?: () => Status
}