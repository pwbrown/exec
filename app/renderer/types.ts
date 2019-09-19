/** Shape of an individual Command */
export interface ICommand {
    label: string;
    command: string;
    exit: boolean;
}

/** Redux Action Type Builders */
export interface IAction<T> { type: T; }
export interface IPayload<T, P> extends IAction<T> { payload: P; }
