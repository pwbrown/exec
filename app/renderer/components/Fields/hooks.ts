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

/** Manage Text Field State */
export const useTextFieldState = (initialState: string) => {
    const [value, setValue] = useState<string>(initialState);
    const onChange: TextFieldChangeEvent = (e) => setValue(e.target.value);
    return { value, onChange };
};

/** Manage Editor State */
export const useEditorState = (initialState: EditorState) => {
    const [editorState, setEditorState] = useState<EditorState>(initialState);
    const onChange: EditorChangeEvent = (nextState) => setEditorState(nextState);
    return { editorState, onChange };
};

/** Manage Select State */
export const useSelectState = <T = string>(initialState: T) => {
    const [value, setValue] = useState<T>(initialState);
    const onChange: SelectChangeEvent = (e) => setValue(e.target.value as T);
    return { value, onChange };
};

/** Manage File Path State */
export const useFilePathState = (initialState: string) => {
    const [value, setValue] = useState<string>(initialState);
    const onChange: FilePathChangeEvent = (filePath) => setValue(filePath);
    return { value, onChange };
};

/** Manage Options State */
interface IOption { label?: string; value: string; }
export const useOptionsState = <T = IOption[]>(initialState: T) => {
    const [value, setValue] = useState<T>(initialState);
    const onChange = (newValue: T) => setValue(newValue);
    return { value, onChange };
};

/** Manage Switch State */
export const useSwitchState = (initialState: boolean) => {
    const [checked, setChecked] = useState<boolean>(initialState);
    const onChange: SwitchChangeEvent = (event, isChecked) => setChecked(isChecked);
    return { checked, onChange };
};
