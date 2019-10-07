export interface IAction<T> { type: T; }
export interface IPayload<T, P> extends IAction<T> { payload: P; }
