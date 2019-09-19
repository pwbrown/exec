/**
 * APP REDUX REDUCER
 */

/** DEPENDENCIES */
import {
    Action,
    Command,
} from "./types";

/** SHAPE OF THE APPLICATION STATE */
export interface IAppState {
    commands: Command[];
}

/** DEFAULT/INITIAL STATE OF THE APPLICATION */
const initialState: IAppState = {
    commands: [],
};

/** ALL ACTIONS TO INTERACT WITH STATE */
enum Actions {
}

type ActionTypes = Action<"TEST">;

export const reducer = (
    state: IAppState = initialState,
    action: ActionTypes,
): IAppState => {
    switch (action.type) {
        default:
            return state;
    }
};
