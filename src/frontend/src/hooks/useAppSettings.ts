import { useEffect } from "react";
import { IStateReducerAction } from "@/interfaces/state/IStateReducerAction";
import { StateReducerActionType } from "@/enums/StateReducerActionTypes";

/**
 * Bootstrap the usage of appsettings.json
 * @param reducer The reducer to dispatch the action to.
 */
export const useAppSettings = (reducer: React.Dispatch<IStateReducerAction> | undefined) => {
    useEffect(() => {
        fetch('/appsettings.json')
            .then(response => response.json())
            .then(data => reducer?.({
                type: StateReducerActionType.SetInitialState,
                value: data
            }))
            .catch(error => console.error('Error loading appsettings.json:', error));
        },
        []
    );
};