/** REACT */
import { FC } from 'react';

/** REDUX & TYPES */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { editArgument, removeArgument } from '../../../../store/actions';
import { Argument } from '../../../../store/types';

interface IDispatchProps {
    edit: (index: number, argument: Argument) => void;
    remove: (index: number) => void;
}

export type Props = IDispatchProps & {
    argument: Argument;
    index: number;
};

const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    edit: (index: number, argument: Argument) => d(editArgument(index, argument)),
    remove: (index: number) => d(removeArgument(index)),
});

export const Connected = (comp: FC<Props>) => connect(null, mapDispatchToProps)(comp);
