/** REACT */
import { KeyboardEvent } from 'react';

/** DRAFTJS */
import {
    DraftDecorator,
    DraftEditorCommand,
    DraftHandleValue,
    EditorState,
} from 'draft-js';

/** IMMUTABLE */
import { Map } from 'immutable';

export type Strategy = DraftDecorator['strategy'];

export interface IStore {
    getEditorState: (() => EditorState) | undefined;
    setEditorState: ((editorState: EditorState) => void) | undefined;
    getPortalClientRect: (offsetKey: string) => ClientRect | DOMRect;
    getAllSearches: () => Map<string, string>;
    isEscaped: (offsetKey: string) => boolean;
    escapeSearch: (offsetKey: string) => void;
    resetEscapedSearch: () => void;
    register: (offsetKey: string) => void;
    updatePortalClientRect: (offsetKey: string, func: () => ClientRect | DOMRect) => void;
    unregister: (offsetKey: string) => void;
    getIsOpened: () => boolean;
    setIsOpened: (nextIsOpened: boolean) => void;
}

export interface ICallbacks {
    keyBindingFn: ((keyboardEvent: KeyboardEvent) => DraftEditorCommand | null) | undefined;
    handleReturn: ((keyboardEvent: KeyboardEvent) => DraftHandleValue) | undefined;
    onChange: ((editorState: EditorState) => EditorState) | undefined;
}
