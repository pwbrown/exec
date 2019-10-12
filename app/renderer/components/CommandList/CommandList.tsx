/** REACT */
import React, { FC, useEffect, useState } from 'react';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

/** REDUX */
import { useSelector } from 'react-redux';
import { State } from '../../store';

/** STYLES */
import { useStyles } from './CommandList.styles';

/** COMPONENTS */
import CommandListItem from './CommandListItem';

const CommandList: FC = () => {
    const classes = useStyles();
    const [ showArchive, setShowArchive ] = useState(false);
    const commands = useSelector(({ command }: State) => command.commands);
    const order = useSelector(({ command }: State) => command.order);
    const archive = useSelector(({ command }: State) => command.archive);
    const toggleArchive = () => setShowArchive(!showArchive);

    useEffect(() => {
        if (!archive.length && showArchive) {
            setShowArchive(false);
        }
    }, [archive]);

    const listCommands = () => order.map((id: string) => {
        const command = commands[id];
        return (
            <CommandListItem
                key={`command-item--${command.id}`}
                command={command}
                archived={false}
            />
        );
    });

    const listArchivedCommands = () => archive.map((id: string) => {
        const command = commands[id];
        return (
            <CommandListItem
                key={`archived-command-item--${command.id}`}
                command={command}
                archived={true}
            />
        );
    });

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography
                    variant='h5'
                    className={classes.title}
                >
                    {showArchive ? 'Command Archive' : 'Commands'}
                </Typography>
                <Button
                    color='secondary'
                    className={classes.headerButton}
                    disabled={(!archive.length && !showArchive)}
                    onClick={toggleArchive}
                >
                    {showArchive ? 'Commands' : 'Archive'}
                </Button>
            </div>
            <Divider/>
            <div className={classes.listOuter}>
                <div className={classes.listInner}>
                    {showArchive ? listArchivedCommands() : listCommands()}
                </div>
            </div>
        </div>
    );
};

export default CommandList;
