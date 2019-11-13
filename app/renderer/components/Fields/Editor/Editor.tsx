/** REACT */
import React, { FC, Fragment, useRef } from 'react';

/** COMPONENTS */
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Editor as DraftJSEditor } from 'draft-js';
import Label from '../Label/Label';

/** EDITOR HOOKS */
import { useEditorStyling } from './Editor.styles';
import { useEditorExtension } from './extension';
import { useEditorRenderers } from './renderers';

/** TYPES */
import { IProps } from './Editor.types';

const Editor: FC<IProps> = (props) => {
    /** EDITOR REF */
    const editor = useRef<DraftJSEditor>(null);

    const { className, ...editorStyling } = useEditorStyling(props);
    const { SuggestionList, editorExtensionProps } = useEditorExtension(props, editor);
    const editorRenderer = useEditorRenderers(props);

    /** ADDITIONAL RENDERERS */
    const renderHelperText = () => {
        const text =
            props.hasError ? 'This field is required.' :
            props.value && props.errorText ? props.errorText :
            props.helperText || '';
        return !text ? <Fragment/> : (
            <FormHelperText variant='outlined' margin='dense' error={props.hasError}>
                {text}
            </FormHelperText>
        );
    };

    return (
        <FormGroup>
            <Label help={props.help} required={props.required}>{props.label}</Label>
            <div className={className}>
                <DraftJSEditor
                    ref={editor}
                    {...props}
                    {...editorStyling}
                    {...editorExtensionProps}
                    {...editorRenderer}
                />
            </div>
            <SuggestionList/>
            {renderHelperText()}
        </FormGroup>
    );
};

export default Editor;
