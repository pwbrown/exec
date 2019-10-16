/** REACT */
import React, { FC } from 'react';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import {
    archiveArgument,
    deleteArgument,
    editArgument,
    restoreArgument,
    State,
} from '../../store';

/** COMPONENTS */
import List from '../List/List';

const ArgumentList: FC = () => {
    /** REDUX */
    const dispatch = useDispatch();
    const args = useSelector((state: State) => state.argument.arguments);
    const order = useSelector((state: State) => state.argument.order);
    const archive = useSelector((state: State) => state.argument.archive);

    /** ACTION HANDLERS */
    const editArg = (id: string) => dispatch(editArgument(id));
    const archiveArg = (id: string) => dispatch(archiveArgument(id));
    const restoreArg = (id: string) => dispatch(restoreArgument(id));
    const deleteArg = (id: string) => dispatch(deleteArgument(id));

    return (
        <List
            title='Arguments'
            items={args}
            order={order}
            archive={archive}
            onEdit={editArg}
            onArchive={archiveArg}
            onRestore={restoreArg}
            onDelete={deleteArg}
        />
    );
};

export default ArgumentList;
