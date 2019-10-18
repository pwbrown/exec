/** REACT */
import React, { FC } from 'react';

/** EDITOR BASE */
import EditorBase from '../EditorBase/EditorBase';

/** FIELDS */
import Editor from '../Fields/Editor/Editor';
import TextField from '../Fields/TextField/TextField';

/** DRAFT */
import { ContentState, EditorState } from 'draft-js';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { closeArgumentEditor, saveArgument, State } from '../../store';
import { ArgumentType, IArgument } from '../../types';

/** UTILS */
import {
    uniqueId,
    useEditorState,
    useTextFieldState,
} from '../../utils';

/** EMPTY ARGUMENT */
const EMPTY: IArgument = {
    context: '<:VALUE:>',
    default: '',
    description: '',
    id: '',
    label: '',
    required: false,
    type: ArgumentType.FREEFORM,
    using: [],
};

const ArgumentEditor: FC = () => {
    const dispatch = useDispatch();

    /** REDUX STATE */
    const show = useSelector((state: State) => state.argument.editor.show);
    const argument = useSelector((state: State) =>
        state.argument.editor.id ? state.argument.arguments[state.argument.editor.id] : { ...EMPTY });

    /** CONTEXT PARTS */
    const [ bef, aft ] = argument.context.split('<:VALUE:>');

    /** FIELD STATES */
    const id = useTextFieldState(argument.id);
    const label = useTextFieldState(argument.label);
    const description = useTextFieldState(argument.description || '');
    const defalt = useTextFieldState(argument.default || ''); // purposely mispelled (default is a reserved keyword)
    const before = useEditorState(
        EditorState.createWithContent(ContentState.createFromText(bef)));
    const after = useEditorState(
        EditorState.createWithContent(ContentState.createFromText(aft)));

    /** EDITOR EVENTS */
    const cancel = () => dispatch(closeArgumentEditor());
    const save = () => {
        const beforeText = before.editorState.getCurrentContent().getPlainText();
        const afterText = after.editorState.getCurrentContent().getPlainText();
        dispatch(saveArgument({
            context: `${beforeText}<:VALUE:>${afterText}`,
            default: defalt.value,
            description: description.value,
            id: id.value,
            label: label.value,
            type: ArgumentType.FREEFORM,
        }));
    };

    return (
        <EditorBase
            show={show}
            title={`${argument.id ? 'Edit' : 'New'} Argument`}
            onCancel={cancel}
            onSave={save}
            z={2}
        >
            <TextField label='Identifier' {...id}/>
            <TextField label='Label' {...label}/>
            <TextField label='Description' {...description}/>
            <TextField label='Default Value' {...defalt}/>
            <Editor label='Before' {...before}/>
            <Editor label='After' {...after}/>
        </EditorBase>
    );
};

export default ArgumentEditor;
