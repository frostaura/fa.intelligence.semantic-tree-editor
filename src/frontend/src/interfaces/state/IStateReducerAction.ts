import { StateReducerActionType } from "../../enums/StateReducerActionTypes";

/**
 * The interface for a request to augment the global state.
 */
export interface IStateReducerAction{
    type: StateReducerActionType,
    value: any
}