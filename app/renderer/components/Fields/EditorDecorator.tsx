/**
 * Line Decorator is a block renderer component for
 * Editor that adds
 */

/** REACT */
import React, { FC } from 'react';

/** DRAFT JS */
import {
    EditorBlock,
} from 'draft-js';

/** STYLES */
import {
    useLinePromptStyles,
} from './EditorDecorator.styles';

/** Adds a ">" character to the beginning of a line(EditorBlock) */
export const LinePrompt: FC<any> = (props) => {
    const classes = useLinePromptStyles();
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <EditorBlock {...props}/>
            </div>
        </div>
    );
};
