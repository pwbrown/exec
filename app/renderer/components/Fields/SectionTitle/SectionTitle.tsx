/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

/** STYLES */
import { useStyles } from './SectionTitle.styles';

const SectionTitle: FC = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography variant='h6' color='textSecondary'>{children}</Typography>
            <Divider/>
        </div>
    );
};

export default SectionTitle;
