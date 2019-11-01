/** REACT */
import React, { FC } from 'react';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import {
    archiveCommand,
    deleteCommand,
    editCommand,
    executeCommand,
    restoreCommand,
    State,
} from '../../store';

/** COMPONENTS */
import List from '../List/List';

const CommandList: FC = () => {
    /** REDUX */
    const dispatch = useDispatch();
    const commands = useSelector((state: State) => state.command.commands);
    const order = useSelector((state: State) => state.command.order);
    const archive = useSelector((state: State) => state.command.archive);

    /** ACTION HANDLERS */
    const editCmd = (id: string) => dispatch(editCommand(id));
    const archiveCmd = (id: string) => dispatch(archiveCommand(id));
    const restoreCmd = (id: string) => dispatch(restoreCommand(id));
    const deleteCmd = (id: string) => dispatch(deleteCommand(id));
    const executeCmd = (id: string) => dispatch(executeCommand(id));

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
