/** DRAFT */
import { EditorState } from 'draft-js';

export interface IStore {
    /** Method for getting the editor state */
    getEditorState: (() => EditorState) | undefined;
    /** Method for setting the editor state */
    setEditorState: ((editorState: EditorState) => void) | undefined;
    /** Method for registering an offset key in the searches map */
    register: (offsetKey: string) => void;
    /** Method for unregistering an offset key in the searches map */
    unregister: (offsetKey: string) => void;
    /** Method for updating the position of the argument suggestion */
    updateRectFunction: (offsetKey: string, func: () => void) => void;
    /** Method for getting the opened state */
    getIsOpened: () => boolean;
    /** Method for settings the opened state */
    setIsOpened: (opened: boolean) => void;
}
