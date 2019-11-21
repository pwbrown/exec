/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Typography from '@material-ui/core/Typography';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import {
    AppState,
    archiveArgument,
    deleteArgument,
    editArgument,
    restoreArgument,
} from 'store';

/** TYPES */
import { IArgument, ICommand } from 'types';

/** COMPONENTS */
import List from '../List/List';

const ArgumentList: FC = () => {
    /** REDUX */
    const dispatch = useDispatch();
    const args = useSelector((state: AppState) => state.argument.arguments);
    const order = useSelector((state: AppState) => state.argument.order);
    const archive = useSelector((state: AppState) => state.argument.archive);

    /** ACTION HANDLERS */
    const editArg = (id: string) => dispatch(editArgument(id));
    const archiveArg = (id: string) => dispatch(archiveArgument(id));
    const restoreArg = (id: string) => dispatch(restoreArgument(id));
    const deleteArg = (id: string) => dispatch(deleteArgument(id));

    const titleRenderer = (item: IArgument | ICommand, archived: boolean) => (
        <Typography>
            {archived ? <s>{item.id}</s> : item.id}
            <Typography variant='caption' color='textSecondary'>
                &nbsp;&nbsp;{archived ? <s>{item.label || ''}</s> : item.label || ''}
            </Typography>
        </Typography>
    );

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
            titleRenderer={titleRenderer}
        />
    );
};

export default ArgumentList;
