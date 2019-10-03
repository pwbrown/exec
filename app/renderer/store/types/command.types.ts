/** Shape of Individual Command */
export interface ICommand {
    label: string;
    command: string;
    args?: Argument[];
}

/** Command Argument Types */
export enum ArgumentType {
    FREE_FORM = 'FREE_FORM',
    OPTIONS = 'OPTIONS',
}

/** Base Shape of a Command Argument */
export interface IArgumentBase {
    id: string;
    label?: string;
    required?: boolean;
    value: string;
}

/********************* ARGUMENT TYPE SHAPES ********************/
export interface IFreeFormArgument extends IArgumentBase {
    type: ArgumentType.FREE_FORM;
}

export interface IOptionsArgument extends IArgumentBase {
    type: ArgumentType.OPTIONS;
    options?: Array<{
        label?: string;
        value: string;
    }>;
}

/** Combined Argument Type */
export type Argument = IFreeFormArgument | IOptionsArgument;
