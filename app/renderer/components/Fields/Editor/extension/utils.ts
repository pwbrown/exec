/** DRAFTJS */
import { EditorState, Modifier, SelectionState } from 'draft-js';

/** IMMUTABLE */
import { Iterable, Map } from 'immutable';

/** TYPES */
import { CustomEntities } from './types';

/** If successful it returns an iterable of offsetKeys to booleans */
export const getKeyFromSelection = (
    es: EditorState,
    searches: Map<string, string>,
): string | null => {
    /** Get the current selection */
    const selection = es.getSelection();
    /** Cancel if a range is selected or the editor does not have focus */
    if (!selection.isCollapsed() || !selection.getHasFocus()) {
        return null;
    }
    /** Get the selection's anchor attributes */
    const anchorKey = selection.getAnchorKey();
    const anchorOffset = selection.getAnchorOffset();
    /** Grab the start and end position of each search */
    const offsetDetails = searches.map((ok) => decodeOffsetKey(ok as string));
    const leaves = offsetDetails
        .filter((details) => details?.blockKey === anchorKey)
        .map((details) => !details ? undefined :
            es.getBlockTree(details.blockKey).getIn([details.decoratorKey]),
        );
    /** Cancel if all leaves are undefined */
    if (leaves.every((leave) => leave === undefined)) {
        return null;
    }
    /** Check if the cursor is positioned in the current word at least after the trigger */
    const text = es.getCurrentContent().getPlainText();
    const selectionIsInsideWord = leaves
        .filter((leave) => leave !== undefined)
        .map(({ start, end }: { start: number, end: number }) =>
            (
                start === 0 &&
                anchorOffset === 1 &&
                text.charAt(anchorOffset) !== '$' &&
                /\$/g.test(text) &&
                anchorOffset <= end
            ) ||
            (
                anchorOffset > start &&
                anchorOffset <= end
            ),
        );
    if (selectionIsInsideWord.every((isInside) => isInside === false)) {
        return null;
    }
    return selectionIsInsideWord.filter((value) => value === true).keySeq().first();
};

/** Takes in an offset key and returns the decoded components  */
const decodeOffsetKey = (offsetKey: string) => {
    const [blockKey, decoratorKey, leafKey] = offsetKey.split('-');
    return {
        blockKey,
        decoratorKey: parseInt(decoratorKey, 10),
        leafKey: parseInt(leafKey, 10),
    };
};

/** Takes in a searchString and a list of arguments and returns a filtered list */
export const filterSuggestions = (
    searchString: string,
    suggestions: string[],
): string[] => {
    const filtered = suggestions
        .filter((s) => !searchString || s.indexOf(searchString) > -1);
    return filtered.slice(0, filtered.length < 5 ? filtered.length : 5);
};

/** Retrieves the search text from the editor state */
export const getSearchText = (es: EditorState) => {
    const sel = es.getSelection();
    const str = es
        .getCurrentContent()
        .getBlockForKey(sel.getAnchorKey())
        .getText()
        .substr(0, sel.getAnchorOffset());
    const begin = str.lastIndexOf('$');
    const searchValue = str.slice(begin + 1);
    const end = str.length;
    return { begin, end, searchValue };
};

export const addArgument = (editorState: EditorState, id: string) => {
    /** Create the new entity and grab the key */
    const stateWithEntity = editorState
        .getCurrentContent()
        .createEntity(CustomEntities.ARGUMENT, 'IMMUTABLE', { id });
    const key = stateWithEntity.getLastCreatedEntityKey();
    const { begin, end } = getSearchText(editorState);

    const selection = editorState.getSelection();

    // get selection of the $argument search text
    const argumentSelection = selection.merge({
        anchorOffset: begin,
        focusOffset: end,
    }) as SelectionState;

    const argumentReplacedContent = Modifier.replaceText(
        editorState.getCurrentContent(),
        argumentSelection,
        `$${id}`,
        undefined, // no inline style needed
        key,
    );

    const newEditorState = EditorState.push(
        editorState,
        argumentReplacedContent,
        'apply-entity', // TODO - CHECK: was 'insert-mention'
    );
    return EditorState.forceSelection(newEditorState, argumentReplacedContent.getSelectionAfter());
};
