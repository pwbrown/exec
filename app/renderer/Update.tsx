/** REACT */
import React, { FC } from "react";

/** ELECTRON */
import { ipcRenderer as ipc, remote} from "electron";

/** MATERIAL */
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import makeStyles from "@material-ui/styles/makeStyles";

/** REDUX */
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IAppState, toggleUpdate } from "./app.reducer";

/** REDUX PROPS */
interface IStateProps {
    open: boolean;
    update: IAppState["update"];
}
interface IDispatchProps {
    close: () => void;
}

export const Update: FC<IStateProps & IDispatchProps> = (props) => {
    const classes = Styles();
    const close = () => props.close();
    const { attempted, checking, available, next, progress } = props.update;

    const CheckOrApply = () => {
        if (available) {
            ipc.send("updater:apply");
        } else {
            ipc.send("updater:check");
        }
    };

    const OnLatest = () => {
        if (attempted && !checking && !available) {
            return (
                <div className={classes.latest}>
                    <Check fontSize="small" color="secondary"/>
                    <Typography color="secondary">Up to Date</Typography>
                </div>
            );
        }
        return "";
    };

    const Progress = () => {
        if (progress && next) {
            return (
                <div className={classes.progress}>
                    <Typography>
                        Downloading version {next.version} ...&nbsp;
                        <Typography component="span" color="textSecondary">
                            {bts(progress.transferred)} of {bts(progress.total)} ({bts(progress.bytesPerSecond)}/s)
                        </Typography>
                    </Typography>
                    <LinearProgress variant="determinate" value={Math.floor(progress.percent)} color="secondary"/>
                </div>
            );
        }
        return "";
    };

    let buttonText: string = "Check for Update";
    if (checking && !progress) {
        buttonText = "Checking ...";
    } else if (available) {
        buttonText = "Install Update and Restart";
    } else if (checking && progress) {
        buttonText = "Downloading ...";
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
                    <Typography variant="caption" color="textSecondary">
                        exec version {remote.app.getVersion()}
                    </Typography>
                    {OnLatest()}
                    {Progress()}
                    <Button
                        variant="contained"
                        color="secondary"
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

/** UTILS */

/** Converts bytes to a readable size */
const bts = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) {
        return "n/a";
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
    if (i === 0) {
        return `${bytes} ${sizes[i]})`;
    }
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
};

/** STYLES */
const Styles = makeStyles({
    button: {
        margin: "10px 0px",
    },
    container: {
        display: "flex",
        flexDirection: "column",
    },
    latest: {
        display: "flex",
        flexDirection: "row",
        margin: "10px 0px",
    },
    progress: {
        display: "flex",
        flexDirection: "column",
        margin: "20px 0px",
    },
});

/** REDUX MAPS */
const mapStateToProps = (state: IAppState): IStateProps => ({
    open: state.updater,
    update: state.update,
});
const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    close: () => d(toggleUpdate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Update);
