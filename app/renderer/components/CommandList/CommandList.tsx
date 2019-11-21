/** REACT */
import React, { FC } from 'react';

/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import {
    AppState,
    archiveCommand,
    deleteCommand,
    editCommand,
    restoreCommand,
} from 'store';

/** COMPONENTS */
import List from '../List/List';

const CommandList: FC = () => {
    /** REDUX */
    const dispatch = useDispatch();
    const commands = useSelector((state: AppState) => state.command.commands);
    const order = useSelector((state: AppState) => state.command.order);
    const archive = useSelector((state: AppState) => state.command.archive);

    /** ACTION HANDLERS */
    const editCmd = (id: string) => dispatch(editCommand(id));
    const archiveCmd = (id: string) => dispatch(archiveCommand(id));
    const restoreCmd = (id: string) => dispatch(restoreCommand(id));
    const deleteCmd = (id: string) => dispatch(deleteCommand(id));

    /** EXECUTE COMMAND */
    const executeCmd = (id: string) => {
        ipc.send('execute:command', id);
    };

    return (
        <List
            title='Commands'
            items={commands}
            order={order}
            archive={archive}
            onEdit={editCmd}
            onArchive={archiveCmd}
            onRestore={restoreCmd}
            onDelete={deleteCmd}
            onClick={executeCmd}
        />
    );
};

export default CommandList;
