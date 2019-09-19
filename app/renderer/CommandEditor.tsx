/** REACT */
import React, { FC } from "react";

/** MATERIAL */
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const CommandEditor: FC = () => {
    return (
        <Dialog open={true} fullWidth={true}>
            <DialogTitle>Create Commmand</DialogTitle>
            <DialogContent>
                <TextField
                    label="Display Name"
                    placeholder="Enter a display name"
                    fullWidth={true}
                    variant="outlined"
                />

            </DialogContent>
        </Dialog>
    );
};

export default CommandEditor;
