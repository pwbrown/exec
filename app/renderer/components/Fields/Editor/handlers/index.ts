/** REACT */
import {
    KeyboardEvent,
    MutableRefObject,
    useEffect,
    useRef,
    useState,
} from 'react';

/** DRAFT JS */
import {
    DraftHandleValue,
    EditorState,
    getDefaultKeyBinding,
} from 'draft-js';

/** IMMUTABLE */
import { Iterable, Map } from 'immutable';

/** TYPES */
import { IProps } from '../Editor.types';

/** UTILS */
import {
    addArgument,
    filterSuggestions,
    getSearchText,
    getSelectionIsInsideWord,
} from './utils';

/** Exposes props for the editor and the suggestion list */
export const useEditorHandlers = (
    props: IProps,
    unlinkedArgs: MutableRefObject<Map<string, string>>,
    shouldRerender: MutableRefObject<boolean>,
) => {
    /** State */
    const [open, setOpen] = useState<boolean>(false);
    const [focusIndex, setFocusIndex] = useState<number>(0);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    /** REFS */
    const activeKey = useRef<string>('');
    const lastSearch = useRef<string | undefined>();
    const lastSelectionIsInsideWord = useRef<Iterable<string, boolean> | undefined>();

    /** RESETTING FOCUS INDEX */
    useEffect(() => {
        const size = suggestions.length;
        if (size > 0 && focusIndex >= size) {
            setFocusIndex(size - 1);
        }
    });

    /** Handle rerender trigger */
    useEffect(() => {
        if (shouldRerender.current) {
            shouldRerender.current = false;
            onChange(props.editorState);
        }
    });

    /** Editor State Change Handler */
    const onChange = (es: EditorState) => {
        const cancel = () => {
            setOpen(false);
            props.onChange(es);
        };
        if (!unlinkedArgs.current.size) {
            return cancel();
        }
        const selectionIsInsideWord = getSelectionIsInsideWord(es, unlinkedArgs.current);
        if (!selectionIsInsideWord) {
            return cancel();
        }
        const lastActiveKey = activeKey.current;
        activeKey.current = selectionIsInsideWord.filter((value) => value === true).keySeq().first();
        const { searchValue } = getSearchText(es);
        if (lastSearch.current !== searchValue || activeKey.current !== lastActiveKey) {
            lastSearch.current = searchValue;
            const filtered = filterSuggestions(searchValue, props.argumentIds || []);
            setSuggestions(filtered);
        }
        if (!open) {
            setOpen(true);
        }
        lastSelectionIsInsideWord.current = selectionIsInsideWord;
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

    return {
        editorHandlerProps: {
            handleReturn,
            keyBindingFn,
            onChange,
        },
        suggestionListHandlerProps: {
            focusIndex,
            onChangeFocus,
            onSelect: commitFocusedSuggestion,
            open,
            suggestions,
        },
    };
};
