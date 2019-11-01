/**
 * Editor is a wrapper for the Draft JS Editor
 * to style it like a material ui outlined text field
 */

/** REACT */
import React, { FC, SyntheticEvent, useState } from 'react';

/** MATERIAL */
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

/** FIELDS */
import Label, { ILabelProps } from '../Label/Label';

/** DRAFT JS */
import { EditorProps } from 'draft-js';
import DraftEditor from 'draft-js-plugins-editor';

/** BLOCK RENDERERS */
import { renderLinePrompts } from './EditorBlockRenderers/LinePrompt';

/** STYLES */
import clsx from 'clsx';
import { useStyles } from './Editor.styles';

/** PLUGINS */
import ArgumentPlugin from './ArgumentPlugin';

/** PROPS */
interface IProps extends EditorProps, ILabelProps {
    label?: string;
    linePrompts?: boolean;
    helperText?: string;
    hasError?: boolean;
    errorText?: string;
}

const Editor: FC<IProps> = (props) => {
    const classes = useStyles();
    const [focused, setFocus] = useState(false);

    /** Focus and Blur interceptors to trigger material styling */
    const onFocus = (e: SyntheticEvent<{}, Event>) => {
        if (typeof props.onFocus === 'function') {
            props.onFocus(e);
        }
        setFocus(true);
    };
    const onBlur = (e: SyntheticEvent<{}, Event>) => {
        if (typeof props.onBlur === 'function') {
            props.onBlur(e);
        }
        setFocus(false);
    };

    let helperText = props.helperText || '';
    if (props.hasError) {
        helperText = 'This field is required.';
        if (props.editorState.getCurrentContent().getPlainText() && props.errorText) {
            helperText = props.errorText;
        }
    }
    const renderHelperText = () => !helperText ? '' : (
        <FormHelperText
            variant='outlined'
            margin='dense'
            error={props.hasError}
        >
            {helperText}
        </FormHelperText>
    );
    return (
        <FormGroup>
            <Label help={props.help} required={props.required}>{props.label}</Label>
            <div className={clsx(classes.container, { [classes.focused]: focused, [classes.error]: props.hasError })}>
                <DraftEditor
                    {...props}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    blockRendererFn={props.linePrompts ? renderLinePrompts : undefined}
                    plugins={[ ArgumentPlugin() ]}
                />
            </div>
            {renderHelperText()}
        </FormGroup>
    );
};

export default Editor;
