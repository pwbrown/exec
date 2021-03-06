/** Command Definition */
export interface ICommand {
    /** Unique identifier */
    id: string;
    /** A label for the command */
    label: string;
    /** A description for the purpose of the command */
    description?: string;
    /** The script to execute */
    script: string;
    /** Starting point or Current Working Directory of command execution */
    cwd?: string;
    /** A list of the argument ids that are used by this command */
    using?: string[];
}
