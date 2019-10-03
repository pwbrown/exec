/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

/** REDUX */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
    cancelArgumentEdit,
    IAppState,
    saveArgument,
    updateArgumentId,
    updateArgumentRequirement,
    updateArgumentType,
    updateArgumentValue,
} from '../../../redux';
import { CmdArgType, ICmdArg } from '../../../utils/types';

/** REDUX PROPS */
interface IStateProps {
    argument: ICmdArg;
    show: boolean;
    editing: boolean;
    index: number;
}
interface IDispatchProps {
    cancel: () => void;
    save: () => void;
    updateId: (id: string) => void;
    updateType: (type: CmdArgType) => void;
    updateValue: (value: string) => void;
    updateRequirment: (required: boolean) => void;
}

const ArgumentEditor: FC<IStateProps & IDispatchProps> = (props) => {
    const cancel = () => props.cancel();
    const save = () => props.save();
    return (
        <Dialog
            open={props.show}
            fullScreen={true}
            PaperProps={{ elevation: 2 }}
        >
            <DialogTitle style={{ paddingBottom: '0px', paddingTop: '40px' }}>
                {props.editing ? 'Edit' : 'Create an'} Argument
            </DialogTitle>
            <DialogContent>
                <div/>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={cancel}
                >
                    Cancel
                </Button>
                <Button
                    variant='outlined'
                    onClick={save}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

/** REDUX MAPS */
const mapStateToProps = (state: IAppState): IStateProps => ({
    argument: state.argumentEditorState.argument,
    editing: state.argumentEditorState.editing,
    index: state.argumentEditorState.index,
    show: state.argumentEditorState.show,
});
const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    cancel: () => d(cancelArgumentEdit()),
    save: () => d(saveArgument()),
    updateId: (id: string) => d(updateArgumentId(id)),
    updateRequirment: (required: boolean) => d(updateArgumentRequirement(required)),
    updateType: (type: CmdArgType) => d(updateArgumentType(type)),
    updateValue: (value: string) => d(updateArgumentValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArgumentEditor);
