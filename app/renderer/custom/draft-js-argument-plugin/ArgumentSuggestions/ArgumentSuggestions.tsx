/** DEPENDENCIES */
import { EditorState, getDefaultKeyBinding, SelectionState } from 'draft-js';
import { Iterable } from 'immutable';
import React, { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';

/** LOCAL */
import { IArgument } from '../../../types';     /** EXEC TYPES */
import { addArgument } from '../modifiers';
import { ICallbacks, IStore } from '../types';  /** PLUGIN TYPES */
import { decodeOffsetKey, getPositionSuggestions, getSearchText, suggestionsFilter } from '../utils';
import ArgumentSuggestionItem from './ArgumentSuggestionItem';

/** PROPS */
interface IProps {
    arguments: IArgument[];
    callbacks: ICallbacks;
    store: IStore;
    onLinkArgument?: (argument: IArgument) => void;
}

/* tslint:disable:curly */
const ArgumentSuggestions: FC<IProps> = (props) => {
    /** STATE */
    const [open, setOpen] = useState<boolean>(false);
    const [focusIndex, setFocusIndex] = useState<number>(0);
    const [suggestions, setSuggestions] = useState<IArgument[]>(props.arguments);

    /** REFS */
    const list = useRef<HTMLDivElement>(null);
    const activeKey = useRef<string>('');
    const lastSearch = useRef<string>('');
    const lastSelectionIsInsideWord = useRef<Iterable<string, boolean> | undefined>();

    /** EFFECTS */
    useEffect(() => { /** On Mount and Unmount only */
        props.callbacks.onChange = onEditorStateChange;
        return () => { props.callbacks.onChange = undefined; };
    }, []);
    useEffect(() => { /** Every Update/Render */
        if (!list.current)
            return;
        const size = suggestions.length;
        if (size > 0 && focusIndex >= size)
            setFocusIndex(size - 1);
        if (!props.store.getAllSearches().has(activeKey.current))
            return;
        const rect = props.store.getPortalClientRect(activeKey.current);
        const styles = getPositionSuggestions(rect, list.current, open, suggestions);
        Object.keys(styles).forEach((k) => {
            if (list.current)
                (list.current.style as any)[k] = (styles as any)[k];
        });
    });

    const forceRerender = () => {
        if (props.store.getEditorState && props.store.setEditorState)
            props.store.setEditorState(props.store.getEditorState());
    };

    const onEditorStateChange = (es: EditorState): EditorState => {
        const searches = props.store.getAllSearches();
        if (!searches.size)
            return es;
        /** Method to call if any check fails */
        const rm = () => {
            props.store.resetEscapedSearch();
            hideList();
            return es;
        };
        /** Get editor state selections */
        const sel = es.getSelection();
        const anchKey = sel.getAnchorKey();
        const anchOff = sel.getAnchorOffset();
        /** Don't show if editor does not have focus */
        if (!sel.isCollapsed() || !sel.getHasFocus())
            return rm();
        /** Don't show if the current selection is not associated with the active key */
        const offsetDetails = searches.map((offsetKey) => decodeOffsetKey(offsetKey as string));
        const leaves = offsetDetails
            .filter((details: any) => details.blockKey === anchKey)
            .map((details: any) => es.getBlockTree(details.blockKey).getIn([details.decoratorKey]));
        if (leaves.every((leave) => leave === undefined))
            return rm();
        /** Don't show if the cursor is not in the current word and after the trigger character */
        const text = es.getCurrentContent().getPlainText();
        const selectionIsInsideWord = leaves
            .filter((leave) => leave !== undefined)
            .map(({ start, end }: {start: number, end: number}) =>
                (
                    start === 0 &&
                    anchOff === 1 &&
                    text.charAt(anchOff) !== '$' &&
                    /\$/g.test(text) &&
                    anchOff <= end
                ) || (anchOff > start && anchOff <= end));
        if (selectionIsInsideWord.every((isInside) => isInside === false))
            return rm();
        /** Store the last active key and update the suggestions */
        const lastActiveKey = activeKey.current;
        activeKey.current = selectionIsInsideWord.filter((value) => value === true).keySeq().first();
        onSearchChange(es, sel, lastActiveKey);
        /** Reset the escaped search */
        if (!props.store.isEscaped(activeKey.current))
            props.store.resetEscapedSearch();
        /** Success: Open the list */
        if (!open && !props.store.isEscaped(activeKey.current) && suggestions.length)
            showList();
        if (
            lastSelectionIsInsideWord.current === undefined ||
            !selectionIsInsideWord.equals(lastSelectionIsInsideWord.current)
        )
            setFocusIndex(0);
        lastSelectionIsInsideWord.current = selectionIsInsideWord;
        return es;
    };

    const onSearchChange = (es: EditorState, sel: SelectionState, lastActiveKey: string) => {
        const { searchValue } = getSearchText(es, sel);
        if (lastSearch.current !== searchValue || activeKey.current !== lastActiveKey) {
            lastSearch.current = searchValue;
            setSuggestions(suggestionsFilter(searchValue, props.arguments));
        }
    };

    const onDownArrow = (e: KeyboardEvent) => {
        e.preventDefault();
        if (suggestions.length)
            onArgumentFocus((focusIndex + 1) % suggestions.length);
    };

    const onUpArrow = (e: KeyboardEvent) => {
        e.preventDefault();
        if (suggestions.length)
            onArgumentFocus(!focusIndex ? suggestions.length - 1 : focusIndex - 1);
    };

    const onTab = (e: KeyboardEvent) => {
        e.preventDefault();
        commitSelection();
    };

    const onEscape = (e: KeyboardEvent) => {
        e.preventDefault();
        props.store.escapeSearch(!lastSelectionIsInsideWord.current ? '' :
            lastSelectionIsInsideWord.current
                .filter((value) => !!value)
                .keySeq()
                .first());
        hideList();
        forceRerender();
    };

    const onArgumentSelect = (argument: IArgument) => {
        if (!argument || !props.store.getEditorState || !props.store.setEditorState)
            return;
        if (props.onLinkArgument)
            props.onLinkArgument(argument);
        hideList();
        props.store.setEditorState(addArgument(props.store.getEditorState(), argument));
    };

    const onArgumentFocus = (index: number) => {
        setFocusIndex(index);
        forceRerender();
    };

    const commitSelection = () => {
        if (!props.store.getIsOpened())
            return 'not-handled';
        onArgumentSelect(suggestions[focusIndex]);
        return 'handled';
    };

    const showList = () => {
        props.callbacks.handleReturn = commitSelection;
        props.callbacks.keyBindingFn = (e: KeyboardEvent) => {
            const kc = e.keyCode;
            if (kc === 40) onDownArrow(e);
            else if (kc === 38) onUpArrow(e);
            else if (kc === 27) onEscape(e);
            else if (kc === 9) onTab(e);
            return null;
        };
        setOpen(true);
    };

    const hideList = () => {
        props.callbacks.handleReturn = undefined;
        props.callbacks.keyBindingFn = undefined;
        setOpen(false);
    };

    const renderSuggestionItem = (argument: IArgument, index: number) => (
        <ArgumentSuggestionItem
            key={argument.id}
            onArgumentSelect={onArgumentSelect}
            onArgumentFocus={onArgumentFocus}
            isFocused={focusIndex === index}
            argument={argument}
            index={index}
        />
    );

    return (
        <div
            ref={list}
            hidden={!open}
            role='listbox'
        >
            {suggestions.map(renderSuggestionItem)}
        </div>
    );
};

export default ArgumentSuggestions;
