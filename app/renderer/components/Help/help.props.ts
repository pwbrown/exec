/** REACT */
import { FC } from 'react';

/** REDUX & TYPES */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleHelp } from '../../store/actions';
import { State } from '../../store/reducers';

interface IStateProps {
    open: boolean;
}

interface IDispatchProps {
    close: () => void;
}

export type Props = IStateProps & IDispatchProps;

const mapStateToProps = (state: State): IStateProps => ({
    open: state.app.help,
});

const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    close: () => d(toggleHelp()),
});

export const Connected = (comp: FC<Props>) => connect(mapStateToProps, mapDispatchToProps)(comp);
