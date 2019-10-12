/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Typography from '@material-ui/core/Typography';

/** STYLES */
import { useStyles } from './TitleBar.styles';

const TitleBar: FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography variant='caption'>exec</Typography>
        </div>
    );
};

export default TitleBar;
