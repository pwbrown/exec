/** REACT */
import React, { FC } from 'react';

/** DRAFT JS */
import {
    EditorBlock,
} from 'draft-js';

/** STYLES */
import { useStyles } from './LinePrompt.styles';

/** Adds a ">" character to the beginning of a line(EditorBlock) */
const LinePrompt: FC<any> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <EditorBlock {...props}/>
            </div>
        </div>
    );
};

export default LinePrompt;
