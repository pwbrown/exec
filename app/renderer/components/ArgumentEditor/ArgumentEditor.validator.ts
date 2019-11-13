/** HOOKS */
import { useArgumentEditorFieldStates } from './ArgumentEditor.hooks';

/** TYPES */
import { ArgumentType, IArgument } from '../../types';

type ArgumentEditorValidator = (
    fields: ReturnType<typeof useArgumentEditorFieldStates>,
    editing: boolean,
    argumentIds: string[],
) => { valid: boolean; argument: IArgument };

export const validate: ArgumentEditorValidator = (fields, editing, ids) => {
    let valid = true;
    let argument: IArgument;
    /************************ ARGUMENT BASE **********************/
    const id = fields.id.value.trim();
    if (id === '' || !/^[A-Z]+(?:\_+[A-Z]+)*$/.test(id) || (!editing && ids.indexOf(id) !== -1)) {
        valid = false;
        fields.id.setHasError(true);
    }
    const label = fields.label.value.trim();
    const description = fields.description.value.trim();
    const required = fields.required.checked;
    const before = fields.before.value;
    const after = fields.after.value;
    const context = `${before}<:VALUE:>${after}`;
    /************************ ARGUMENT TYPES ********************/
    const type = fields.type.value;
    switch (type) {
        case ArgumentType.OPTIONS:
            const options = fields.oOptions.value;
            if (!options.length || options.filter((opt) => !opt.value.trim()).length) {
                valid = false;
                fields.oOptions.setHasError(true);
            }
            argument = {
                context,
                default: fields.oDefault.value,
                description,
                id,
                label,
                options,
                required,
                type,
            };
            break;
        case ArgumentType.FILE_SYSTEM:
            const start = fields.fsStart.value;
            const allowFile = fields.fsAllowFile.checked;
            const allowDir = fields.fsAllowDir.checked;
            const showHidden = fields.fsShowHidden.checked;
            const extensions: string[] = [];
            argument = {
                allowDir,
                allowFile,
                context,
                default: fields.fsDefault.value,
                description,
                extensions,
                id,
                label,
                required,
                showHidden,
                start,
                type,
            };
            break;
        case ArgumentType.FREEFORM:
        default:
            argument = {
                context,
                default: fields.ffDefault.value,
                description,
                id,
                label,
                required,
                type,
            };
            break;
    }

    return { argument, valid };
};
