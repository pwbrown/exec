/** REACT */
import {
    ChangeEvent,
    ChangeEventHandler,
    useState,
} from 'react';

/** DRAFT */
import { EditorState } from 'draft-js';

/** TYPES */
type TextFieldChangeEvent = ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
type EditorChangeEvent = (editorState: EditorState) => void;
type SelectChangeEvent = ChangeEventHandler<{ name?: string | undefined, value: unknown }>;
type FilePathChangeEvent = (filePath: string) => void;
type SwitchChangeEvent = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;

const useErrorState = () => {
    const [hasError, setHasError] = useState<boolean>(false);
    return { hasError, setHasError };
};

/** Manage Text Field State */
export const useTextFieldState = (initialState: string) => {
    const [value, setValue] = useState<string>(initialState);
    const error = useErrorState();
    const onChange: TextFieldChangeEvent = (e) => {
        error.setHasError(false);
        setValue(e.target.value);
    };
    return { value, onChange, ...error };
};

/** Manage Editor State */
export const useEditorState = (initialState: EditorState) => {
    const [editorState, setEditorState] = useState<EditorState>(initialState);
    const error = useErrorState();
    const onChange: EditorChangeEvent = (nextState) => {
        /** onChange is called on focus, so disable error on non empty string */
        if (nextState.getCurrentContent().getPlainText() !== '') {
            error.setHasError(false);
        }
        setEditorState(nextState);
    };
    return { editorState, onChange, ...error };
};

/** Manage Select State */
export const useSelectState = <T = string>(initialState: T) => {
    const [value, setValue] = useState<T>(initialState);
    const error = useErrorState();
    const onChange: SelectChangeEvent = (e) => {
        error.setHasError(false);
        setValue(e.target.value as T);
    };
    return { value, onChange, ...error };
};

/** Manage File Path State */
export const useFilePathState = (initialState: string) => {
    const [value, setValue] = useState<string>(initialState);
    const error = useErrorState();
    const onChange: FilePathChangeEvent = (filePath) => {
        error.setHasError(false);
        setValue(filePath);
    };
    return { value, onChange, ...error };
};

/** Manage Options State */
export interface IOption { label?: string; value: string; }
export const useOptionsState = (initialState: IOption[]) => {
    const [value, setValue] = useState<IOption[]>(initialState);
    const error = useErrorState();
    const onChange = (newValue: IOption[]) => {
        error.setHasError(false);
        setValue(newValue);
    };
    return { value, onChange, ...error };
};

/** Manage Switch State */
export const useSwitchState = (initialState: boolean) => {
    const [checked, setChecked] = useState<boolean>(initialState);
    const onChange: SwitchChangeEvent = (event, isChecked) => setChecked(isChecked);
    return { checked, onChange };
};

/** Manage the linked arguments list */
export const useLinkedArgumentsState = (initialState: string[]) => {
    const [linkedArgs, setLinkedArgs] = useState<string[]>(initialState);
    const onLinkArgument = (id: string) => {
        if (linkedArgs.indexOf(id) < 0) {
            setLinkedArgs([ ...linkedArgs, id ]);
        }
    };
    const onUnlinkArgument = (id: string) => {
        const i = linkedArgs.indexOf(id);
        if (i > -1) {
            setLinkedArgs([
                ...linkedArgs.slice(0, i),
                ...linkedArgs.slice(i + 1),
            ]);
        }
    };
    return { linkedArgs, onLinkArgument, onUnlinkArgument };
};
