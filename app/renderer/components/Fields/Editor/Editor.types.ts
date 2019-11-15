/** DRAFTJS */
import { EditorProps } from 'draft-js';

/** TYPES */
import { ILabelProps } from '../Label/Label';

type EditorPropsNotControlled = Omit<EditorProps, 'editorState' | 'onChange'>;

export interface IProps extends EditorPropsNotControlled, ILabelProps {
    /** Editor will take care of generating editor state on initial load */
    value?: string;
    /** Editor will take care of returning the plain text version of the string */
    onChange: (value: string) => void;
    label?: string;
    helperText?: string;
    hasError?: boolean;
    errorText?: string;
    prompts?: boolean;
    linkedArgs?: string[];
    excludeArgs?: string[];
    preventArgCreate?: boolean;
    onLinkArgument?: (id: string) => void;
    onUnlinkArgument?: (id: string) => void;
}
