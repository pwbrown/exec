/** REACT */
import { FC } from 'react';

/** REDUX & TYPES */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { editCommand, removeCommand } from '../../../store/actions';
import { ICommand } from '../../../store/types';

interface IDispatchProps {
    edit: (index: number, command: ICommand) => void;
    remove: (index: number) => void;
}

export type Props = IDispatchProps & {
    command: ICommand;
    index: number;
};

const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    edit: (index: number, command: ICommand) => d(editCommand(index, command)),
    remove: (index: number) => d(removeCommand(index)),
});

export const Connected = (comp: FC<Props>) => connect(null, mapDispatchToProps)(comp);
