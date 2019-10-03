/** REACT */
import { FC } from 'react';

/** REDUX */
import { connect } from 'react-redux';
import { State } from '../../store/reducers';
import { Theme } from '../../store/types';

interface IStateProps {
    theme: Theme;
}

export type Props = IStateProps;

const mapStateToProps = (state: State): IStateProps => ({
    theme: state.app.theme,
});

export const Connected = (comp: FC<Props>) => connect(mapStateToProps)(comp);
