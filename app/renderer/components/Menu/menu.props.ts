/** REACT */
import { FC } from 'react';

/** REDUX */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
    createCommand,
    toggleHelp,
    toggleUpdate,
} from '../../store/actions';
import { State } from '../../store/reducers';

interface IStateProps {
    updateAvailable: boolean;
}

interface IDispatchProps {
    create: () => void;
    help: () => void;
    update: () => void;
}

export type Props = IStateProps & IDispatchProps;

const mapStateToProps = (state: State): IStateProps => ({
    updateAvailable: state.update.status.available,
});

const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    create: () => d(createCommand()),
    help: () => d(toggleHelp()),
    update: () => d(toggleUpdate()),
});

export const Connected = (comp: FC<Props>) => connect(mapStateToProps, mapDispatchToProps)(comp);
