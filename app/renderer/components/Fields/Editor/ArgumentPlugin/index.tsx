/** REACT */
import React from 'react';

/** DRAFT */
import {} from 'draft-js';
import { EditorPlugin } from 'draft-js-plugins-editor';

/** IMMUTABLE */
import { Map } from 'immutable';

/** DECORATORS */
import {
    ArgumentSuggestion,
    ArgumentSuggestionStrategy,
} from './ArgumentSuggestion';

/** TYPES */
import { IStore } from './types';

/* tslint:disable:object-literal-sort-keys */
export default (): EditorPlugin => {

    /** Internal state of the plugin */
    let searches = Map<string, string>();
    let rectFuncs = Map<string, () => void>();
    let isOpened: boolean = false;

    const store: IStore = {
        getEditorState: undefined,
        setEditorState: undefined,
        register: (offsetKey) => {
            searches = searches.set(offsetKey, offsetKey);
        },
        unregister: (offsetKey) => {
            searches = searches.delete(offsetKey);
            rectFuncs = rectFuncs.delete(offsetKey);
        },
        updateRectFunction: (offsetKey, func) => {
            rectFuncs = rectFuncs.set(offsetKey, func);
        },
        getIsOpened: () => isOpened,
        setIsOpened: (opened) => {
            isOpened = opened;
        },
    };

    /** Decorate the components for the plugin decorators with additional props */
    const DecoratedArgumentSuggestionComponent = (props: any) => (
        <ArgumentSuggestion {...props} store={store}/>
    );

    return {
        decorators: [
            {
                component: DecoratedArgumentSuggestionComponent,
                strategy: ArgumentSuggestionStrategy,
            },
        ],
        initialize: ({ getEditorState, setEditorState }) => {
            /** Store the methods for managing editor state */
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
        },
    };
};
