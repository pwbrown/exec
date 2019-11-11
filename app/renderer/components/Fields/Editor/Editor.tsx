/** REACT */
import React, { FC, Fragment, useEffect, useState } from 'react';

/** MATERIAL */
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

/** DRAFT JS */
import {
    CompositeDecorator,
    Editor as DraftJSEditor,
    EditorProps,
    EditorState,
} from 'draft-js';

/** BLOCK RENDERERS */
import { renderLinePrompts } from './renderers/LinePrompt';

/** DECORATORS */
import LinkedArgument, { LinkedArgumentStrategy } from './decorators/LinkedArgument';
import UnlinkedArgument, { UnlinkedArgumentStrategy } from './decorators/UnlinkedArgument';

/** FIELDS */
import Label, { ILabelProps } from '../Label/Label';

/** STYLES */
import clsx from 'clsx';
import { useStyles } from './Editor.styles';

/** PROPS */
interface IProps extends EditorProps, ILabelProps {
    label?: string;
    helperText?: string;
    hasError?: boolean;
    errorText?: string;
    prompts?: boolean;
    onLinkArgument?: (id: string) => void;
    onUnlinkArgument?: (id: string) => void;
    onCreateArgument?: (id?: string) => void;
}

const Editor: FC<IProps> = (props) => {
    const classes = useStyles();
    const [focused, setFocus] = useState(false);
    const plainText = props.editorState.getCurrentContent().getPlainText();

    /** FOCUS/BLUR INTERCEPTORS */
    const onFocus = (e: any) => {
        setFocus(true);
        if (props.onFocus) { props.onFocus(e); }
    };
    const onBlur = (e: any) => {
        setFocus(false);
        if (props.onBlur) { props.onBlur(e); }
    };

    /** INITIALIZING DECORATORS */
    const DecoratedUnlinkedArgument: FC<any> = (passThrough) =>
        <UnlinkedArgument {...passThrough}/>;
    useEffect(() => {
        const decorator = new CompositeDecorator([
            {
                component: LinkedArgument,
                strategy: LinkedArgumentStrategy,
            },
            {
                component: DecoratedUnlinkedArgument,
                strategy: UnlinkedArgumentStrategy,
            },
        ]);
        props.onChange(EditorState.set(props.editorState, { decorator }));
    }, []);

    /** ADDITIONAL RENDERERS */
    const renderHelperText = () => {
        const text =
            props.hasError ? 'This field is required.' :
            plainText && props.errorText ? props.errorText :
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
            <div className={clsx(classes.container, { [classes.focused]: focused, [classes.error]: props.hasError })}>
                <DraftJSEditor
                    {...props}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    blockRendererFn={props.prompts ? renderLinePrompts : undefined}
                />
            </div>
            {renderHelperText()}
        </FormGroup>
    );
};

export default Editor;
