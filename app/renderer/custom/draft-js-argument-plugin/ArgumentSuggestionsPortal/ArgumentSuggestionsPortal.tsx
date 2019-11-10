/** REACT */
import React, {
    FC,
    useEffect,
    useRef,
} from 'react';

/** DRAFTJS */
import { EditorState } from 'draft-js';

/** TYPES */
import { IStore } from '../types';

/** STYLES */
import { useStyles } from './ArgumentSuggestionsPortal.styles';

/** PROPS */
interface IProps {
    offsetKey: string;
    store: IStore;
    getEditorState: () => EditorState;
    setEditorState: (editorState: EditorState) => void;
}

const ArgumentSuggestionsPortal: FC<IProps> = (props) => {
    const classes = useStyles();

    /** Reference to span element */
    const searchPortalRef = useRef<HTMLSpanElement>(null);

    /** Actions to perform on mount and dismount only */
    useEffect(() => {
        props.store.register(props.offsetKey);
        props.store.setIsOpened(true);
        props.setEditorState(props.getEditorState()); // Force a rerender
        return () => {
            props.store.unregister(props.offsetKey);
            props.store.setIsOpened(false);
        };
    }, [props.offsetKey]);

    /** Actions to perform on every update */
    useEffect(() => {
        props.store.updatePortalClientRect(props.offsetKey, () => {
            if (searchPortalRef.current) {
                return searchPortalRef.current.getBoundingClientRect();
            }
            return { height: 0, width: 0, x: 0, y: 0 } as DOMRect;
        });
    });
    return (
        <span
            ref={searchPortalRef}
            className={classes.container}
        >
            {props.children}
        </span>
    );
};

export default ArgumentSuggestionsPortal;
