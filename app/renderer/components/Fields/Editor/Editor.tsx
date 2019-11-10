/**
 * Editor is a wrapper for the Draft JS Editor
 * to style it like a material ui outlined text field
 */

/** REACT */
import React, {
    FC,
    Fragment,
    SyntheticEvent,
    useEffect,
    useRef,
    useState,
} from 'react';

/** MATERIAL */
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

/** FIELDS */
import Label, { ILabelProps } from '../Label/Label';

/** DRAFT JS */
import { EditorProps } from 'draft-js';
import DraftEditor from 'draft-js-plugins-editor';

/** BLOCK RENDERERS */
import { renderLinePrompts } from './BlockRenderers/LinePrompt';

/** STYLES */
import clsx from 'clsx';
import { useStyles } from './Editor.styles';

/** TYPES */
import { IArgument } from '../../../types';

/** PLUGINS */
import DraftJSArgumentPlugin, { IDraftJSArgumentPlugin } from '../../../custom/draft-js-argument-plugin';

/** PROPS */
interface IProps extends EditorProps, ILabelProps {
    label?: string;
    linePrompts?: boolean;
    helperText?: string;
    hasError?: boolean;
    errorText?: string;
    arguments?: IArgument[];
    onLinkArgument?: (argument: IArgument) => void;
    onUnlinkArgument?: (argument: IArgument) => void;
}

const Editor: FC<IProps> = (props) => {
    const classes = useStyles();
    const [focused, setFocus] = useState(false);

    /** Argument Plugin */
    const ArgumentPluginRef = useRef<IDraftJSArgumentPlugin>();
    useEffect(() => {
        /** Save the plugin only once */
        ArgumentPluginRef.current = DraftJSArgumentPlugin();
    }, []);

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

    /** Don't load if the plugin ref effect has not been called */
    if (!ArgumentPluginRef.current) {
        return <Fragment/>;
    }

    const { ArgumentPlugin, ArgumentSuggestions } = ArgumentPluginRef.current;

    return (
        <FormGroup>
            <Label help={props.help} required={props.required}>{props.label}</Label>
            <div className={clsx(classes.container, { [classes.focused]: focused, [classes.error]: props.hasError })}>
                <DraftEditor
                    {...props}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    blockRendererFn={props.linePrompts ? renderLinePrompts : undefined}
                    plugins={[ ArgumentPlugin ]}
                />
                <ArgumentSuggestions
                    arguments={props.arguments || []}
                />
            </div>
            {renderHelperText()}
        </FormGroup>
    );
};

export default Editor;
