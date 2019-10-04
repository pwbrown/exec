/** REACT */
import { FC } from 'react';

/** REDUX & TYPES */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
    addArgument,
    closeArgumentEditor,
    updateArgument,
    updateArgumentId,
    updateArgumentLabel,
    updateArgumentRequirement,
    updateArgumentType,
    updateArgumentValue,
} from '../../../store/actions';
import { State } from '../../../store/reducers';
import { Argument, ArgumentType } from '../../../store/types';

interface IStateProps {
    argument: Argument;
    show: boolean;
    editing: boolean;
    index: number;
}

interface IDispatchProps {
    close: () => void;
    addArgument: (argument: Argument) => void;
    updateArgument: (index: number, argument: Argument) => void;
    updateId: (id: string) => void;
    updateType: (type: ArgumentType) => void;
    updateValue: (type: string) => void;
    updateRequirement: (required: boolean) => void;
    updateLabel: (label: string) => void;
}

export type Props = IStateProps & IDispatchProps;

const mapStateToProps = (state: State): IStateProps => ({
    argument: state.argumentEditor.argument,
    editing: state.argumentEditor.editing,
    index: state.argumentEditor.index,
    show: state.argumentEditor.show,
});

const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    addArgument: (argument: Argument) => d(addArgument(argument)),
    close: () => d(closeArgumentEditor()),
    updateArgument: (index: number, argument: Argument) => d(updateArgument(index, argument)),
    updateId: (id: string) => d(updateArgumentId(id)),
    updateLabel: (label: string) => d(updateArgumentLabel(label)),
    updateRequirement: (required: boolean) => d(updateArgumentRequirement(required)),
    updateType: (type: ArgumentType) => d(updateArgumentType(type)),
    updateValue: (value: string) => d(updateArgumentValue(value)),
});

export const Connected = (comp: FC<Props>) => connect(mapStateToProps, mapDispatchToProps)(comp);
