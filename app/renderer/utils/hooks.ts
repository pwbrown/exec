/** REACT */
import { ChangeEventHandler, useState } from 'react';

/** DRAFT */
import { EditorState } from 'draft-js';

/** TYPES */
type TextFieldEvent = ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
type ScriptEditorFieldEvent = (editorState: EditorState) => void;

/** Manage Text Field State */
export const useTextFieldState = (initialState: string) => {
    const [value, setValue] = useState<string>(initialState);
    const onChange: TextFieldEvent = (e) => setValue(e.target.value);
    return { value, onChange };
};

/** Manage Editor State */
export const useEditorState = (initialState: EditorState) => {
    const [editorState, setEditorState] = useState<EditorState>(initialState);
    const onChange: ScriptEditorFieldEvent =
        (nextState) => setEditorState(nextState);
    return { editorState, onChange };
};
