/** REACT */
import React, { FC, MutableRefObject } from 'react';

/** IMMUTABLE */
import { Map } from 'immutable';

/** DRAFT JS */
import {
    CompositeDecorator,
    ContentState,
    EditorState,
    Modifier,
    SelectionState,
} from 'draft-js';

/** DECORATORS */
import LinkedArgument, { LinkedArgumentStrategy } from './decorators/LinkedArgument';
import UnlinkedArgument, { UnlinkedArgumentStrategy } from './decorators/UnlinkedArgument';

/** TYPES */
import { CustomEntities } from './types';

/** Used to initialize editor state */
export const createEditorState = (
    text: string,
    linkedArgs: string[],
    unlinkedArgs: MutableRefObject<Map<string, string>>,
    shouldRerender: MutableRefObject<boolean>,
): EditorState => {
    /** Create a new Content State with the text */
    let cs = ContentState.createFromText(text);
    /**
     * Search the content blocks and look for text matches
     * that should be entities, and replace those with their
     * applicable custom entity
     */
    cs.getBlockMap().forEach((block) => {
        if (!block) { return true; }
        const bKey = block.getKey();
        UnlinkedArgumentStrategy(block, (start, end) => {
            const id = block.getText().slice(start + 1, end);
            if (linkedArgs.indexOf(id) < 0) { return; }
            cs = cs.createEntity(CustomEntities.ARGUMENT, 'IMMUTABLE', { id });
            const eKey = cs.getLastCreatedEntityKey();
            const sel = new SelectionState({
                anchorKey: bKey, anchorOffset: start,
                focusKey: bKey, focusOffset: end,
            });
            cs = Modifier.replaceText(cs, sel, `$${id}`, undefined, eKey);
        }, cs);
    });
    /** Create a new Editor State from the content state above */
    let es = EditorState.createWithContent(cs);
    /** Setup and apply decorators */
    const onRegister = (offsetKey: string) => {
        unlinkedArgs.current = unlinkedArgs.current.set(offsetKey, offsetKey);
        shouldRerender.current = true;
    };
    const onUnregister = (offsetKey: string) => {
        unlinkedArgs.current = unlinkedArgs.current.delete(offsetKey);
        shouldRerender.current = true;
    };
    const DecoratedUnlinkedArgument: FC<any> = (passThrough) =>
        <UnlinkedArgument {...passThrough} onRegister={onRegister} onUnregister={onUnregister}/>;
    const decorator = new CompositeDecorator([
        { component: LinkedArgument, strategy: LinkedArgumentStrategy },
        { component: DecoratedUnlinkedArgument, strategy: UnlinkedArgumentStrategy },
    ]);
    es = EditorState.set(es, { decorator });
    /** Return the created editor state */
    return es;
};
