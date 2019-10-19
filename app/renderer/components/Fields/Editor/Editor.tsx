/**
 * Editor is a wrapper for the Draft JS Editor
 * to style it like a material ui outlined text field
 */

/** REACT */
import React, { FC, SyntheticEvent, useState } from 'react';

/** MATERIAL */
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';

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
interface IProps extends EditorProps {
    /** Label to go above field */
    label?: string;
    /** Places a ">" character at the beginning of each line to simulate cli env */
    linePrompts?: boolean;
    /** Whether the field is required */
    required?: boolean;
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

    return (
        <FormGroup>
            <Typography>{props.label || ''}{props.required ? ' *' : ''}</Typography>
            <div className={clsx(classes.container, { [classes.focused]: focused })}>
                <DraftEditor
                    {...props}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    blockRendererFn={props.linePrompts ? renderLinePrompts : undefined}
                    plugins={[ ArgumentPlugin() ]}
                />
            </div>
        </FormGroup>
    );
};

export default Editor;