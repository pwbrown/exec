/** REACT */
import React, { FC, useState } from 'react';

/** DRAFT JS */
import {
    Editor,
    EditorBlock,
    EditorProps,
} from 'draft-js';

/** STYLES */
import classnames from 'classnames';
import { useStyles } from './ScriptEditorField.styles';

/** PROPS */
interface IProps {
    editorState: EditorProps['editorState'];
    onChange: EditorProps['onChange'];
}

const ScriptEditorField: FC<IProps> = (props) => {
    const classes = useStyles();
    const [focused, setFocusState] = useState(false);
    const setFocus = (focusState: boolean) => () => setFocusState(focusState);
    const blockRendererFn = () => ({ component: LineDecorator });
    return (
        <div className={classnames(classes.container, {[classes.focused]: focused})}>
            <Editor
                {...props}
                onFocus={setFocus(true)}
                onBlur={setFocus(false)}
                blockRendererFn={blockRendererFn}
            />
        </div>
    );
};

const LineDecorator: FC<any> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.line}>
            <div className={classes.lineContent}>
                <EditorBlock {...props}/>
            </div>
        </div>
    );
};

export default ScriptEditorField;
