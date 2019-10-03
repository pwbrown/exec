/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import List from '@material-ui/core/List';

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
            <List>
                {props.commands.map((c, i) => <Command key={clean(c.label)} command={c} index={i}/>)}
            </List>
        );
    }
};

export default Connected(CommandList);
