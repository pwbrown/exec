/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

/** PROPS */
import { Connected, Props } from './help.props';

const Help: FC<Props> = (props) => {
    const close = () => props.close();
    return (
        <Dialog open={props.open} onClose={close} fullWidth={true}>
            <DialogActions>
                <IconButton onClick={close}>
                    <Close/>
                </IconButton>
            </DialogActions>
            <DialogContent>
                <DialogContentText>
                    - Create a command by clicking on the + icon.
                </DialogContentText>
                <DialogContentText>
                    - Execute a command by clicking on the command in the list.
                </DialogContentText>
                <DialogContentText>
                    - Edit or Remove a command by right clicking on the command in the list.
                </DialogContentText>
                <DialogContentText>
                    - <strong>NOTE:</strong> All commands will execute in a remote terminal
                    window using the context of your 'HOME' directory.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default Connected(Help);
