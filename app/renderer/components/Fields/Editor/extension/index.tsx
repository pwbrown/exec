/** REACT */
import React, { FC, KeyboardEvent, RefObject, useEffect, useRef, useState } from 'react';

/** DRAFT JS */
import { DraftHandleValue, Editor, EditorState, getDefaultKeyBinding } from 'draft-js';

/** IMMUTABLE */
import { Map } from 'immutable';

/** TYPES */
import { IProps } from '../Editor.types';

/** COMPONENTS */
import SuggestionList from './SuggestionList';

/** UTILS */
import { createEditorState } from './initialize';
import { addArgument, filterSuggestions, getKeyFromSelection, getSearchText } from './utils';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { AppState, createArgument } from '../../../../store';

/** Exposes props for the editor and the suggestion list */
export const useEditorExtension = (props: IProps, editor: RefObject<Editor>) => {
    /** STORE */
    const dispatch = useDispatch();
    const argIds = useSelector((state: AppState) => state.argument.order);

    /** REFS */
    const shouldRerender = useRef(false);
    const unlinkedArgs = useRef(Map<string, string>());
    const activeKey = useRef<string>('');
    const lastSearch = useRef<string | undefined>();

    /** STATE */
    const [editorState, setEditorState] = useState<EditorState>(
        createEditorState(
            props.value || '',
            props.linkedArgs || [],
            unlinkedArgs,
            shouldRerender));
    const [open, setOpen] = useState<boolean>(false);
    const [focusIndex, setFocusIndex] = useState<number>(0);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    /** HANDLE FOCUS INDEX RESET & RERENDER TRIGGER */
    useEffect(() => {
        const size = suggestions.length;
        if (size > 0 && focusIndex >= size) {
            setFocusIndex(size - 1);
        }
        if (shouldRerender.current) {
            shouldRerender.current = false;
            onChange(editorState);
        }
    });

    /** HANDLE NEW ARGUMENT RETURN */
    useEffect(() => {
        if (lastSearch.current !== undefined && unlinkedArgs.current.size) {
            updateSuggestionsList(lastSearch.current);
            if (editor.current) {
                editor.current.focus(); // Focus back on the editor when returning
            }
        }
    }, [argIds.length]);

    /** Editor State Change Handler */
    const onChange = (es: EditorState) => {
        const closeList = () => {
            setOpen(false);
            applyEditorState(es);
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
            updateSuggestionsList(searchValue);
        }
        if (!open) {
            setOpen(true);
        }
        applyEditorState(es);
    };

    const updateSuggestionsList = (searchValue: string) => {
        setSuggestions(filterSuggestions(
            searchValue,
            argIds.filter((id) => props.excludeArgs === undefined || props.excludeArgs.indexOf(id) < 0),
        ));
    };

    const applyEditorState = (es: EditorState) => {
        props.onChange(es.getCurrentContent().getPlainText());
        setEditorState(es);
    };

    const commitFocusedSuggestion = () => {
        if (suggestions.length) {
            const toAdd = suggestions[focusIndex];
            if (props.onLinkArgument) {
                props.onLinkArgument(toAdd);
            }
            setOpen(false);
            onChange(addArgument(editorState, toAdd));
        } else if (!props.preventArgCreate) {
            onCreate();
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
    const onCreate = () => {
        setOpen(false);
        dispatch(createArgument(getSearchText(editorState).searchValue));
    };

    const DecoratedSuggestionList: FC = () => (
        <SuggestionList
            open={open}
            focusIndex={focusIndex}
            onChangeFocus={onChangeFocus}
            onSelect={commitFocusedSuggestion}
            suggestions={suggestions}
            onCreate={onCreate}
            noCreate={props.preventArgCreate}
        />
    );

    return {
        SuggestionList: DecoratedSuggestionList,
        editorExtensionProps: { editorState, handleReturn, keyBindingFn, onChange },
    };
};
