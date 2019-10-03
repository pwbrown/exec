/** REACT */
import { FC } from 'react';

/** REDUX & TYPES */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleUpdate } from '../../store/actions';
import { State } from '../../store/reducers';
import { IUpdateState } from '../../store/types';

interface IStateProps {
    open: boolean;
    status: IUpdateState['status'];
}

interface IDispatchProps {
    close: () => void;
}

export type Props = IStateProps & IDispatchProps;

const mapStateToProps = (state: State): IStateProps => ({
    open: state.update.show,
    status: state.update.status,
});

const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    close: () => d(toggleUpdate()),
});

export const Connected = (comp: FC<Props>) => connect(mapStateToProps, mapDispatchToProps)(comp);
