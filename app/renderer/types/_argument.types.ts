/** Base definition for Argument */
export interface IArgumentBase {
    /** Unique identifier */
    id: string;
    /** A label for the argument */
    label?: string;
    /** A description of the purpose of the argument */
    description?: string;
    /** Whether the argument is required */
    required?: boolean;
    /** The contextual value of the argument */
    context: string;
    /** A list of arguments used by the argument */
    using?: string[];
}

/** Argument Types */
export enum ArgumentType {
    /** Allows entering free text as an argument */
    FREEFORM = 'FREEFORM',
    /** Allows choosing from from predetermined options */
    OPTIONS = 'OPTIONS',
    /** Allows selecting a file location */
    FILE_SYSTEM = 'FILE_SYSTEM',
}

/** Freeform Argument */
export interface IFreeformArgument extends IArgumentBase {
    type: ArgumentType.FREEFORM;
    /** Default Text to use for the freeform argument */
    default?: string;
}

/** Options Argument */
export interface IArgumentOption {
    /** Value to use for the option */
    value: string;
    /** Friendly label to display for the option */
    label?: string;
}
export interface IOptionsArgument extends IArgumentBase {
    type: ArgumentType.OPTIONS;
    /** List of options to select for the argument */
    options: IArgumentOption[];
    /** Default selection */
    default?: string;
}

/** File System Argument */
export interface IFileSystemArgument extends IArgumentBase {
    type: ArgumentType.FILE_SYSTEM;
    /** Default Location */
    default?: string;
    /** Default Starting Location in dialog */
    start?: string;
    /** Whether to allow file selection */
    allowFile: boolean;
    /** Whether to allow directory selection */
    allowDir: boolean;
    /** Whether to show hidden files */
    showHidden: boolean;
    /** Limit to a list of file extensions */
    extensions: string[];
}

/** Argument Definition */
export type IArgument = IFreeformArgument | IOptionsArgument | IFileSystemArgument;
