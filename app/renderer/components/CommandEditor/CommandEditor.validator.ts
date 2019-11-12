/** HOOKS */
import { useCommandEditorFieldStates } from './CommandEditor.hooks';

/** TYPES */
import { ICommand } from '../../types';

/** UTILS */
import { uniqueId } from '../../utils';

type CommandEditorValidator = (
    fields: ReturnType<typeof useCommandEditorFieldStates>,
    currentId: string,
    allIds: string[],
) => { valid: boolean; command: ICommand };

export const validate: CommandEditorValidator = (fields, currentId, allIds) => {
    let valid = true;
    const label = fields.label.value.trim();
    if (label === '') {
        valid = false;
        fields.label.setHasError(true);
    }
    const description = fields.description.value.trim();
    const script = fields.script.editorState.getCurrentContent().getPlainText();
    if (script.trim() === '') {
        valid = false;
        fields.script.setHasError(true);
    }
    const using = fields.using.linkedArgs;
    /** Clean up 'using' since the unLinkArgument event doesn't work yet :( */
    for (let i = using.length - 1; i >= 0; i--) {
        const index = script.indexOf(using[i]);
        if (index < 0) {
            using.splice(index, 1);
        }
    }
    const id = currentId || uniqueId(label, allIds);
    return {
        command: {
            description,
            id,
            label,
            script,
            using,
        },
        valid,
    };
};
