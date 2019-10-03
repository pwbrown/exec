/** REACT */
import { FC } from 'react';

/** REDUX & TYPES */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
    addCommand,
    closeCommandEditor,
    updateCommand,
    updateCommandCommand,
    updateCommandLabel,
} from '../../store/actions';
import { State } from '../../store/reducers';
import { ICommand } from '../../store/types';

interface IStateProps {
    show: boolean;
    editing: boolean;
    command: ICommand;
    index: number;
}

interface IDispatchProps {
    close: () => void;
    updateLabelValue: (label: string) => void;
    updateCommandValue: (command: string) => void;
    addCommand: (command: ICommand) => void;
    updateCommand: (index: number, command: ICommand) => void;
}

export type Props = IStateProps & IDispatchProps;

const mapStateToProps = (state: State): IStateProps => ({
    command: state.commandEditor.command,
    editing: state.commandEditor.editing,
    index: state.commandEditor.index,
    show: state.commandEditor.show,
});

const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    addCommand: (command: ICommand) => d(addCommand(command)),
    close: () => d(closeCommandEditor()),
    updateCommand: (index: number, command: ICommand) => d(updateCommand(index, command)),
    updateCommandValue: (command: string) => d(updateCommandCommand(command)),
    updateLabelValue: (label: string) => d(updateCommandLabel(label)),
});

export const Connected = (comp: FC<Props>) => connect(mapStateToProps, mapDispatchToProps)(comp);
