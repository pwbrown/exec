/** REACT */
import React, { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';

/** DRAFT JS */
import { CompositeDecorator, DraftHandleValue, EditorState, getDefaultKeyBinding } from 'draft-js';

/** IMMUTABLE */
import { Iterable, Map } from 'immutable';

/** TYPES */
import { IProps } from '../Editor.types';

/** DECORATORS */
import LinkedArgument from './decorators/LinkedArgument';
import LinkedArgumentStrategy from './decorators/LinkedArgument.strategy';
import UnlinkedArgument from './decorators/UnlinkedArgument';
import UnlinkedArgumentStrategy from './decorators/UnlinkedArgument.strategy';

/** COMPONENTS */
import SuggestionList from './SuggestionList';

/** UTILS */
import { addArgument, filterSuggestions, getKeyFromSelection, getSearchText } from './utils';

/** Exposes props for the editor and the suggestion list */
export const useEditorExtension = (props: IProps) => {
    /** STATE */
    const [open, setOpen] = useState<boolean>(false);
    const [focusIndex, setFocusIndex] = useState<number>(0);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    /** REFS */
    const shouldRerender = useRef(false);
    const unlinkedArgs = useRef(Map<string, string>());
    const activeKey = useRef<string>('');
    const lastSearch = useRef<string | undefined>();

    /** DECORATORS */
    const onRegister = (offsetKey: string) => {
        unlinkedArgs.current = unlinkedArgs.current.set(offsetKey, offsetKey);
        shouldRerender.current = true;
    };
    const onUnregister = (offsetKey: string) => {
        unlinkedArgs.current = unlinkedArgs.current.delete(offsetKey);
        shouldRerender.current = true;
    };
    const DecoratedUnlinkedArgument: FC<any> = (passThrough) => (
        <UnlinkedArgument
            {...passThrough}
            onRegister={onRegister}
            onUnregister={onUnregister}
        />
    );
    useEffect(() => {
        const decorator = new CompositeDecorator([
            { component: LinkedArgument, strategy: LinkedArgumentStrategy },
            { component: DecoratedUnlinkedArgument, strategy: UnlinkedArgumentStrategy },
        ]);
        props.onChange(EditorState.set(props.editorState, { decorator }));
    }, []);

    /** HANDLE FOCUS INDEX RESET & RERENDER TRIGGER */
    useEffect(() => {
        const size = suggestions.length;
        if (size > 0 && focusIndex >= size) {
            setFocusIndex(size - 1);
        }
        if (shouldRerender.current) {
            shouldRerender.current = false;
            onChange(props.editorState);
        }
    });

    /** Editor State Change Handler */
    const onChange = (es: EditorState) => {
        const closeList = () => {
            setOpen(false);
            props.onChange(es);
        };
        if (!unlinkedArgs.current.size) {
            return closeList();
        }
        const selectionKey = getKeyFromSelection(es, unlinkedArgs.current);
        if (!selectionKey) {
            return closeList();
        }
        const lastActiveKey = activeKey.current;
        activeKey.current = selectionKey;
        const { searchValue } = getSearchText(es);
        if (lastSearch.current !== searchValue || activeKey.current !== lastActiveKey) {
            lastSearch.current = searchValue;
            setSuggestions(filterSuggestions(searchValue, props.argumentIds || []));
        }
        if (!open) {
            setOpen(true);
        }
        props.onChange(es);
    };

    const commitFocusedSuggestion = () => {
        if (suggestions.length) {
            const toAdd = suggestions[focusIndex];
            if (props.onLinkArgument) {
                props.onLinkArgument(toAdd);
            }
            setOpen(false);
            onChange(addArgument(props.editorState, toAdd));
        }
    };

    /** Editor Return Key Handler */
    const handleReturn = (e: KeyboardEvent): DraftHandleValue => {
        if (open) {
            commitFocusedSuggestion();
            return 'handled';
        }
        return 'not-handled';
    };

    /** Editor Key Press Handler */
    const keyBindingFn = (e: KeyboardEvent) => {
        if (open) {
            const code = e.keyCode;
            if ([40, 38, 9].indexOf(code) > -1) { e.preventDefault(); }
            /** DOWN ARROW */
            if (code === 40) {
                setFocusIndex(suggestions.length ? (focusIndex + 1) % suggestions.length : 0);
            }
            /** UP ARROW */
            if (code === 38) {
                setFocusIndex(!focusIndex ? suggestions.length - 1 : focusIndex - 1);
            }
            /** TAB KEY */
            if (code === 9) {
                commitFocusedSuggestion();
            }
        }
        return getDefaultKeyBinding(e);
    };

    const onChangeFocus = (index: number) => setFocusIndex(index);

    const DecoratedSuggestionList: FC = () => (
        <SuggestionList
            open={open}
            focusIndex={focusIndex}
            onChangeFocus={onChangeFocus}
            onSelect={commitFocusedSuggestion}
            suggestions={suggestions}
        />
    );

    return {
        SuggestionList: DecoratedSuggestionList,
        editorExtensionProps: { handleReturn, keyBindingFn, onChange },
    };
};
