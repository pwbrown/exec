/** REACT */
import React, { FC } from 'react';

/** ELECTRON */
import { ipcRenderer as ipc, remote} from 'electron';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

/** TOOLS */
import { bts } from '../../utils/tools';

/** PROPS & STYLES */
import { Connected, Props } from './update.props';
import { UpdateStyles } from './update.styles';

export const Update: FC<Props> = (props) => {
    const classes = UpdateStyles();
    const close = () => props.close();
    const { attempted, checking, available, next, progress } = props.status;

    const CheckOrApply = () => {
        if (available) {
            ipc.send('updater:apply');
        } else {
            ipc.send('updater:check');
        }
    };

    const OnLatest = () => {
        if (attempted && !checking && !available) {
            return (
                <div className={classes.latest}>
                    <Check fontSize='small' color='secondary'/>
                    <Typography color='secondary'>Up to Date</Typography>
                </div>
            );
        }
        return '';
    };

    const Progress = () => {
        if (progress && next) {
            return (
                <div className={classes.progress}>
                    <Typography>
                        Downloading version {next.version} ...&nbsp;
                        <Typography component='span' color='textSecondary'>
                            {bts(progress.transferred)} of {bts(progress.total)} ({bts(progress.bytesPerSecond)}/s)
                        </Typography>
                    </Typography>
                    <LinearProgress variant='determinate' value={Math.floor(progress.percent)} color='secondary'/>
                </div>
            );
        }
        return '';
    };

    let buttonText: string = 'Check for Update';
    if (checking && !progress) {
        buttonText = 'Checking ...';
    } else if (available) {
        buttonText = 'Install Update and Restart';
    } else if (checking && progress) {
        buttonText = 'Downloading ...';
    }

    return (
        <Dialog
            open={props.open}
            fullWidth={true}
            onClose={close}
        >
            <DialogActions>
                <IconButton onClick={close}>
                    <Close/>
                </IconButton>
            </DialogActions>
            <DialogContent>
                <div className={classes.container}>
                    <Typography variant='caption' color='textSecondary'>
                        exec version {remote.app.getVersion()}
                    </Typography>
                    {OnLatest()}
                    {Progress()}
                    <Button
                        variant='contained'
                        color='secondary'
                        disabled={checking}
                        onClick={CheckOrApply}
                        className={classes.button}
                    >
                        {buttonText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Connected(Update);
