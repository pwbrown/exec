/** DRAFTJS */
import { EditorProps } from 'draft-js';

/** TYPES */
import { ILabelProps } from '../Label/Label';

export interface IProps extends EditorProps, ILabelProps {
    label?: string;
    helperText?: string;
    hasError?: boolean;
    errorText?: string;
    prompts?: boolean;
    argumentIds?: string[];
    onLinkArgument?: (id: string) => void;
    onUnlinkArgument?: (id: string) => void;
    onCreateArgument?: (id?: string) => void;
}
