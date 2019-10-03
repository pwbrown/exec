/** REACT */
import { FC } from 'react';

/** REDUX */
import { connect } from 'react-redux';
import {} from '../../store/actions';
import { State } from '../../store/reducers';
import { ICommand } from '../../store/types';

interface IStateProps {
    commands: ICommand[];
}

export type Props = IStateProps;

const mapStateToProps = (state: State): IStateProps => ({
    commands: state.app.commands,
});

export const Connected = (comp: FC<Props>) => connect(mapStateToProps)(comp);
