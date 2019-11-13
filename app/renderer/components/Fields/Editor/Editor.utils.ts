/** DRAFT JS */
import { ContentState, EditorState, Modifier, SelectionState } from 'draft-js';

/** STRATEGY */
import uaStrategy from './extension/decorators/UnlinkedArgument.strategy';

/** TYPES */
import { CustomEntities } from './extension/types';

/**
 * Takes in raw text and an array of argument ids
 *   and replaces linked argument matches with entities
 */
export const editorStateFromText = (
    text: string,
    linkedArgs: string[],
): EditorState => {
    let cs = ContentState.createFromText(text);
    cs.getBlockMap().forEach((block) => {
        if (!block) { return true; }
        const bKey = block.getKey();
        uaStrategy(block, (start, end) => {
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
    return EditorState.createWithContent(cs);
};
