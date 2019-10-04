/** REACT */
import React, { FC, Fragment } from 'react';

/** MATERIAL */
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

/** COMPONENTS */
import Command from './Command';

/** PROPS */
import { Connected, Props } from './commandList.props';

/** UTILITIES */
const clean = (label: string) => {
    return label.toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, '');
};

const CommandList: FC<Props> = (props) => {
    if (!props.commands.length) {
        return <div/>;
    } else {
        return (
            <Fragment>
                <Typography variant='h5' style={{ marginTop: 10 }}>Commands</Typography>
                <Divider style={{ margin: '5px 0px' }}/>
                <List dense={true}>
                    {props.commands.map((c, i) => <Command key={clean(c.label)} command={c} index={i}/>)}
                </List>
            </Fragment>
        );
    }
};

export default Connected(CommandList);
