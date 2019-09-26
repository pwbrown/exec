/** TYPES */
import {
    IAction,
    ICommand,
    IPayload,
    IUpdateStatus,
} from '../utils/types';

/** SHAPE OF THE APPLICATION STATE */
export interface IAppState {
    /** All of the commands saved */
    commands: ICommand[];
    /** The state of the command displayed in the editor */
    command: ICommand;
    /** The index of the command loaded into the editor */
    index: number;
    /** Whether the editor is handling creating or editing */
    creating: boolean;
    /** Whether the editor is displayed */
    editor: boolean;
    /** Whether the help dialog is displayed */
    help: boolean;
    /** The apps current color theme */
    theme: 'dark' | 'light';
    /** Whether the updater dialog is displayed */
    updater: boolean;
    /** Software update status */
    update: IUpdateStatus & {
        attempted: boolean;
    };
}

/** ALL ACTIONS TO INTERACT WITH STATE */
export enum Actions {
    CANCEL_EDIT = 'CANCEL_EDIT',
    CREATE_COMMAND = 'CREATE_COMMAND',
    EDIT_COMMAND = 'EDIT_COMMAND',
    SAVE_COMMAND = 'SAVE_COMMAND',
    TOGGLE_HELP = 'TOGGLE_HELP',
    TOGGLE_UPDATE = 'TOGGLE_UPDATE',
    UPDATE_CURRENT_LABEL = 'UPDATE_CURRENT_LABEL',
    UPDATE_CURRENT_COMMAND = 'UPDATE_CURRENT_COMMAND',
    REMOVE_COMMAND = 'REMOVE_COMMAND',
    UPDATE_STATUS = 'UPDATE_STATUS',
    UPDATE_THEME = 'UPDATE_THEME',
}

export type ActionTypes =
    IAction<Actions.CANCEL_EDIT> |
    IAction<Actions.CREATE_COMMAND> |
    IAction<Actions.SAVE_COMMAND> |
    IAction<Actions.TOGGLE_HELP> |
    IAction<Actions.TOGGLE_UPDATE> |
    IPayload<Actions.EDIT_COMMAND, { index: number }> |
    IPayload<Actions.REMOVE_COMMAND, { index: number}> |
    IPayload<Actions.UPDATE_CURRENT_LABEL, { label: string }> |
    IPayload<Actions.UPDATE_CURRENT_COMMAND, { command: string }> |
    IPayload<Actions.UPDATE_STATUS, { update: Partial<IAppState['update']> }> |
    IPayload<Actions.UPDATE_THEME, { theme: IAppState['theme'] }>;
