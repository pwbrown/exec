/** REACT */
import React, { FC, useEffect, useRef } from 'react';

/** DRAFT */
import { EditorState } from 'draft-js';

/** TYPES */
import { IStore } from '../types';

/** PROPS */
interface IProps {
    /** Copy of the store instance */
    store: IStore;
    /** Unique identifier for the current offset */
    offsetKey: string;
    /** The full identified text of the decorator */
    decoratorText: string;
    /** Method for getting the editor state */
    getEditorState: () => EditorState;
    /** Method for setting the editor state */
    setEditorState: (editorState: EditorState) => void;
}

export const ArgumentSuggestion: FC<IProps> = (props) => {
    const span = useRef<HTMLSpanElement>(null);

    /** Actions to perform on mount and unmount */
    useEffect(() => {
        props.store.register(props.offsetKey);
        props.store.setIsOpened(true);
        props.setEditorState(props.getEditorState());
        return () => {
            props.store.unregister(props.offsetKey);
            props.store.setIsOpened(false);
        };
    }, [props.offsetKey]);

    /** Actions to perform in every update/render */
    useEffect(() => {
        props.store.updateRectFunction(props.offsetKey, () =>
            span.current ? span.current.getBoundingClientRect() : null);
    });

    return (
        <span ref={span} style={{color: 'yellow'}}>
            {props.children}
        </span>
    );
};
