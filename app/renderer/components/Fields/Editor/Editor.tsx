/** REACT */
import React, { FC, Fragment, useRef } from 'react';

/** IMMUTABLE */
import { Map } from 'immutable';

/** COMPONENTS */
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Editor as DraftJSEditor } from 'draft-js';
import Label from '../Label/Label';
import SuggestionList from './SuggestionList';

/** EDITOR HOOKS */
import { useEditorDecorators } from './decorators';
import { useEditorStyling } from './Editor.styles';
import { useEditorHandlers } from './handlers';
import { useEditorRenderers } from './renderers';

/** TYPES */
import { IProps } from './Editor.types';

const Editor: FC<IProps> = (props) => {
    /** Refs */
    const shouldRerender = useRef(false);
    const unlinkedArgs = useRef(Map<string, string>());

    /** Initialize Decorators */
    useEditorDecorators(props, unlinkedArgs, shouldRerender);

    /** ADDITIONAL RENDERERS */
    const renderHelperText = () => {
        const text =
            props.hasError ? 'This field is required.' :
            props.editorState.getCurrentContent().getPlainText() && props.errorText ? props.errorText :
            props.helperText || '';
        return !text ? <Fragment/> : (
            <FormHelperText variant='outlined' margin='dense' error={props.hasError}>
                {text}
            </FormHelperText>
        );
    };

    /** Get Component Props from hooks */
    const {
        className,
        ...editorStyling
    } = useEditorStyling(props);
    const {
        editorHandlerProps,
        suggestionListHandlerProps,
    } = useEditorHandlers(props, unlinkedArgs, shouldRerender);
    const editorRenderer = useEditorRenderers(props);

    return (
        <FormGroup>
            <Label help={props.help} required={props.required}>{props.label}</Label>
            <div className={className}>
                <DraftJSEditor
                    {...props}
                    {...editorStyling}
                    {...editorHandlerProps}
                    {...editorRenderer}
                />
            </div>
            <SuggestionList {...suggestionListHandlerProps}/>
            {renderHelperText()}
        </FormGroup>
    );
};

export default Editor;
