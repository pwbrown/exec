/** DEPENDENCIES */
import { getDefaultKeyBinding } from 'draft-js';
import { EditorPlugin } from 'draft-js-plugins-editor';
import { Map } from 'immutable';
import React from 'react';

/** LOCAL */
import Argument from './Argument/Argument';
import argumentStrategy from './argumentStrategy';
import ArgumentSuggestions from './ArgumentSuggestions/ArgumentSuggestions';
import ArgumentSuggestionsPortal from './ArgumentSuggestionsPortal/ArgumentSuggestionsPortal';
import argumentSuggestionStrategy from './argumentSuggestionStrategy';
import { ICallbacks, IStore } from './types';

/** PLUGIN */
/* tslint:disable:object-literal-sort-keys */
const DraftJSArgumentPlugin = () => {
    /** Callbacks reassigned by decorated ArgumentSuggestions Component */
    const callbacks: ICallbacks = {
        keyBindingFn: undefined,
        handleReturn: undefined,
        onChange: undefined,
    };

    /** Attributes set by the store */
    let searches = Map<string, string>();
    let escapedSearch: string | undefined;
    let clientRectFunctions = Map<string, () => ClientRect | DOMRect>();
    let isOpened: boolean = false;

    /** Shared store between internal components */
    const store: IStore = {
        getEditorState: undefined,
        setEditorState: undefined,
        getPortalClientRect: (offsetKey) => clientRectFunctions.get(offsetKey)(),
        getAllSearches: () => searches,
        isEscaped: (offsetKey) => escapedSearch === offsetKey,
        escapeSearch: (offsetKey) => {
            escapedSearch = offsetKey;
        },
        resetEscapedSearch: () => {
            escapedSearch = undefined;
        },
        register: (offsetKey) => {
            searches = searches.set(offsetKey, offsetKey);
        },
        updatePortalClientRect: (offsetKey, func) => {
            clientRectFunctions = clientRectFunctions.set(offsetKey, func);
        },
        unregister: (offsetKey) => {
            searches = searches.delete(offsetKey);
            clientRectFunctions = clientRectFunctions.delete(offsetKey);
        },
        getIsOpened: () => isOpened,
        setIsOpened: (nextIsOpened) => {
            isOpened = nextIsOpened;
        },
    };

    /** Decorated Components */
    const DecoratedArgumentSuggestionsComponent = (props: any) => (
        <ArgumentSuggestions
            {...props}
            callbacks={callbacks}
            store={store}
        />
    );
    const DecoratedMentionSuggestionsPortal = (props: any) => (
        <ArgumentSuggestionsPortal
            {...props}
            store={store}
        />
    );

    const ArgumentPlugin: EditorPlugin = {
        decorators: [
            {
                strategy: argumentStrategy,
                component: Argument,
            },
            {
                strategy: argumentSuggestionStrategy,
                component: DecoratedMentionSuggestionsPortal,
            },
        ],
        initialize: ({ getEditorState, setEditorState }) => {
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
        },
        keyBindingFn: (e) => {
            if (callbacks.keyBindingFn) {
                callbacks.keyBindingFn(e);
            }
            return getDefaultKeyBinding(e);
        },
        handleReturn: (keyboardEvent) =>
            !callbacks.handleReturn ? 'not-handled' : callbacks.handleReturn(keyboardEvent),
        onChange: (editorState) =>
            callbacks.onChange ? callbacks.onChange(editorState) : editorState,
    };

    return {
        ArgumentPlugin,
        ArgumentSuggestions: DecoratedArgumentSuggestionsComponent,
    };
};

export default DraftJSArgumentPlugin;

export type IDraftJSArgumentPlugin = ReturnType<typeof DraftJSArgumentPlugin>;
