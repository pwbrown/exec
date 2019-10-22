/** REACT */
import React, { FC, useState } from 'react';

/** MATERIAL */
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

/** STYLES */
import clsx from 'clsx';
import { useStyles } from './Section.styles';

/** PROPS */
interface IProps {
    label?: string;
    startExpanded?: boolean;
    required?: boolean;
    hasError?: boolean;
}

const Section: FC<IProps> = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(props.startExpanded || false);
    const toggle = () => setExpanded(!expanded);
    return (
        <Paper className={classes.container}>
            <div className={classes.header} onClick={toggle}>
                <Typography variant='h6' color={props.hasError ? 'error' : 'textSecondary'}>
                    {props.label || ''}{props.required ? ' *' : ''}
                </Typography>
                <KeyboardArrowDown className={clsx(classes.icon, {[classes.flipped]: expanded})}/>
            </div>
            <Collapse in={expanded}>
                <Divider/>
                <div className={classes.fields}>
                    {props.children}
                </div>
            </Collapse>
        </Paper>
    );
};

export default Section;
