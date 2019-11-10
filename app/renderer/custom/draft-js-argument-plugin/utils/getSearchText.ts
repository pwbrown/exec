/** DRAFTJS */
import { EditorState, SelectionState } from 'draft-js';

export const getSearchText = (editorState: EditorState, selection: SelectionState) => {
    const str = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getAnchorKey())
        .getText()
        .substr(0, selection.getAnchorOffset());
    const begin = str.lastIndexOf('$');
    const searchValue = str.slice(begin + 1);
    const end = str.length;
    return { begin, end, searchValue };
};
