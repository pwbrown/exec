/** DRAFTJS */
import {
    EditorState,
    Modifier,
    SelectionState,
} from 'draft-js';

/** UTILS */
import { getSearchText } from '../utils';

/** TYPES */
import { IArgument } from '../../../types';

export const addArgument = (editorState: EditorState, argument: IArgument) => {
    /** Create the new entity and grab the key */
    const stateWithEntity = editorState
        .getCurrentContent()
        .createEntity('argument', 'IMMUTABLE', { argument });
    const key = stateWithEntity.getLastCreatedEntityKey();

    const selection = editorState.getSelection();
    const { begin, end } = getSearchText(editorState, selection);

    // get selection of the $argument search text
    const argumentSelection = selection.merge({
        anchorOffset: begin,
        focusOffset: end,
    }) as SelectionState;

    let argumentReplacedContent = Modifier.replaceText(
        editorState.getCurrentContent(),
        argumentSelection,
        `$${argument.id}`,
        undefined, // no inline style needed
        key,
    );

    // If the mention is inserted at the end, a space is appended right after for
    // a smooth writing experience.
    const blockKey = argumentSelection.getAnchorKey();
    const blockSize = editorState
        .getCurrentContent()
        .getBlockForKey(blockKey)
        .getLength();
    if (blockSize === end) {
        argumentReplacedContent = Modifier.insertText(
            argumentReplacedContent,
            argumentReplacedContent.getSelectionAfter(),
            ' ',
        );
    }

    const newEditorState = EditorState.push(
        editorState,
        argumentReplacedContent,
        'apply-entity', // TODO - CHECK: was 'insert-mention'
    );
    return EditorState.forceSelection(newEditorState, argumentReplacedContent.getSelectionAfter());
};
