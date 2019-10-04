/** REACT */
import { FC } from 'react';

/** REDUX & TYPES */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createArgument } from '../../../store/actions';
import { State } from '../../../store/reducers';
import { Argument } from '../../../store/types';

interface IStateProps {
    arguments: Argument[];
}

interface IDispatchProps {
    create: () => void;
}

export type Props = IStateProps & IDispatchProps;

const mapStateToProps = (state: State): IStateProps => ({
    arguments: state.commandEditor.command.args || [],
});

const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    create: () => d(createArgument()),
});

export const Connected = (comp: FC<Props>) => connect(mapStateToProps, mapDispatchToProps)(comp);
