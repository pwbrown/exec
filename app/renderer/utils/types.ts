/** UPDATER */
import { ProgressInfo, UpdateInfo} from 'builder-util-runtime';

/** Shape of an individual Command */
export interface ICommand {
    label: string;
    command: string;
    args?: ICmdArg[];
}

/** COMMAND ARGUMENT TYPES */
export enum CmdArgType {
    FREE_FORM = 'FREE_FORM',
    OPTIONS = 'OPTIONS',
}

export interface ICmdArgBase {
    id: string;
    required?: boolean;
    label?: string;
    value: string;
}

/*********************** ARGUMENT TYPES ***********************/

export interface ICmdArgFreeForm extends ICmdArgBase {
    type: CmdArgType.FREE_FORM;
}

export interface ICmdArgOptions extends ICmdArgBase {
    type: CmdArgType.OPTIONS;
    options: Array<{
        label?: string;
        value: string;
    }>;
}

/***************** COMBINED ARGUMENT TYPE ******************/
export type ICmdArg = ICmdArgFreeForm & ICmdArgOptions;

export interface IUpdateStatus {
    available: boolean;
    checking: boolean;
    next: UpdateInfo | null;
    progress: ProgressInfo | null;
}

/** Redux Action Type Builders */
export interface IAction<T> { type: T; }
export interface IPayload<T, P> extends IAction<T> { payload: P; }
