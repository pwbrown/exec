/** REACT */
import { ChangeEventHandler, useReducer } from 'react';

/** TYPES */
import { IAction, IPayload } from '../../../types';
type TextFieldChangeEvent = ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;

/** Options Reducer State */
interface IState {
    show: boolean;
    error: boolean;
    index: number;
    value: string;
    label: string;
}

enum Actions {
    'CREATE' = 'CREATE',
    'EDIT' = 'EDIT',
    'CLOSE' = 'CLOSE',
    'SET_ERROR' = 'SET_ERROR',
    'UPDATE_VALUE' = 'UPDATE_VALUE',
    'UPDATE_LABEL' = 'UPDATE_LABEL',
}

type ActionType =
    IAction<Actions.CREATE> |
    IPayload<Actions.EDIT, { index: number, value: string, label: string }> |
    IAction<Actions.CLOSE> |
    IAction<Actions.SET_ERROR> |
    IPayload<Actions.UPDATE_VALUE, { value: string }> |
    IPayload<Actions.UPDATE_LABEL, { label: string }>;

const OptionsReducer = (
    state: IState,
    action: ActionType,
): IState => {
    let next: IState;
    switch (action.type) {
        case Actions.CREATE:
            return {
                ...state,
                error: false,
                index: -1,
                label: '',
                show: true,
                value: '',
            };
        case Actions.EDIT:
            return {
                ...state,
                error: false,
                index: action.payload.index,
                label: action.payload.label,
                show: true,
                value: action.payload.value,
            };
        case Actions.CLOSE:
            return { ...state, show: false };
        case Actions.SET_ERROR:
            return { ...state, error: true };
        case Actions.UPDATE_VALUE:
            next = { ...state, value: action.payload.value };
            if (next.value && state.error ) {
                next.error = false;
            }
            return next;
        case Actions.UPDATE_LABEL:
            return { ...state, label: action.payload.label };
        default:
            return state;
    }
};

export const useOptionsReducer = () => {
    const [state, dispatch] = useReducer(OptionsReducer, {
        error: false,
        index: -1,
        label: '',
        show: false,
        value: '',
    });
    const create = () => dispatch({
        type: Actions.CREATE,
    });
    const edit = (index: number, value: string, label: string) => () => dispatch({
        payload: { index, value, label },
        type: Actions.EDIT,
    });
    const close = () => dispatch({
        type: Actions.CLOSE,
    });
    const setError = () => dispatch({
        type: Actions.SET_ERROR,
    });
    const updateValue: TextFieldChangeEvent = (e) => dispatch({
        payload: { value: e.target.value },
        type: Actions.UPDATE_VALUE,
    });
    const updateLabel: TextFieldChangeEvent = (e) => dispatch({
        payload: { label: e.target.value },
        type: Actions.UPDATE_LABEL,
    });
    return {
        close,
        create,
        edit,
        setError,
        state,
        updateLabel,
        updateValue,
    };
};
