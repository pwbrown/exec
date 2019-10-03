/** REACT */
import { FC } from 'react';

/** REDUX */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createArgument } from '../../../store/actions';
import { State } from '../../../store/reducers';
import { ICommand } from '../../../store/types';

interface IStateProps {
    command: ICommand;
}

interface IDispatchProps {
    create: (id: string) => void;
}

export type Props = IStateProps & IDispatchProps;

const mapStateToProps = (state: State): IStateProps => ({
    command: state.commandEditor.command,
});

const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    create: (id: string) => d(createArgument(id)),
});

export const Connected = (comp: FC<Props>) => connect(mapStateToProps, mapDispatchToProps)(comp);
