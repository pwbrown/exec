/** REACT */
import React, { FC, Fragment } from 'react';

/** MATERIAL */
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

/** REDUX */
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';

/** FIELDS */
import Preview from '../Preview/Preview';

/** STYLES */
import { useStyles } from './ScriptPreview.styles';

/** PROPS */
interface IProps {
    script: string;
    linkedArgs: string[];
    label?: string;
    help?: string;
}

const ScriptPreview: FC<IProps> = (props) => {
    const classes = useStyles();
    const args = useSelector((state: AppState) => state.argument.arguments);

    const scriptWithStyledArgs = () =>
        !props.script.trim() ? 'Start building a script above to see its full preview' :
            props.script
                /** Split the script using the argument syntax as a delimiter (and include args in split array) */
                .split(/(\$(?:[A-Z]+(?:\_+[A-Z]+)*)?)/g)
                /** Iterate through the split array and replace linked arguments with appropriate entities */
                .map((value, index) => {
                    // Even indexes from split are not arguments
                    if (index % 2 === 0) {
                        return value;
                    }
                    const id = value.substring(1);
                    // Treat as text if the argument is invalid or unlinked
                    if (!args[id] || props.linkedArgs.indexOf(id) < 0) {
                        return value;
                    }
                    return (
                        <span
                            key={`arg-${id}`}
                            className={args[id].required ? classes.required : classes.optional}
                        >
                            {args[id].context.replace('<:VALUE:>', value)}
                        </span>
                    );
                });

    return (
        <Preview label={props.label} help={props.help}>
            <Typography variant='caption' className={classes.colors}>
                Colors:
                <li>Script</li>
                <li className={classes.required}>Required Argument</li>
                <li className={classes.optional}>Optional Argument</li>
            </Typography>
            <Divider className={classes.divider}/>
            {scriptWithStyledArgs()}
        </Preview>
    );
};

export default ScriptPreview;
