/**
 * PURPOSE:
 *  The visual representation of a single item in the list of
 *  arguments
 */

/** REACT */
import React, {
    FC,
    MouseEvent,
    useEffect,
    useRef,
} from 'react';

/** TYPES */
import { IArgument } from '../../../types';

/** STYLES */
import clsx from 'clsx';
import { useStyles } from './ArgumentSuggestionItem.styles';

/** PROPS */
interface IProps {
    argument: IArgument;
    index: number;
    isFocused: boolean;
    onArgumentSelect: (argument: IArgument) => void;
    onArgumentFocus: (index: number) => void;
}

const ArgumentSuggestionItem: FC<IProps> = (props) => {
    const classes = useStyles();
    const mouseDown = useRef<boolean>(false);

    useEffect(() => {
        mouseDown.current = false;
    });

    const onMouseUp = () => {
        if (mouseDown.current) {
            props.onArgumentSelect(props.argument);
            mouseDown.current = false;
        }
    };

    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        mouseDown.current = true;
    };

    const onMouseEnter = () => {
        props.onArgumentFocus(props.index);
    };

    return (
        <div
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            role='option'
            className={clsx(classes.container, {[classes.focused]: props.isFocused})}
        >
            <span>{props.argument.id}</span>
        </div>
    );
};

export default ArgumentSuggestionItem;
