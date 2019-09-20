/** REACT */
import React, { FC, Fragment, useState } from "react";

/** MATERIAL */
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Add from "@material-ui/icons/Add";
import HelpOutline from "@material-ui/icons/HelpOutline";

/** REDUX */
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createCommand, toggleHelp } from "./app.reducer";

/** REDUX PROPS */
interface IDispatchProps {
    create: () => void;
    help: () => void;
}

const Controls: FC<IDispatchProps> = (props) => {
    const create = () => props.create();
    const help = () => props.help();
    return (
        <Fragment>
            <Tooltip title="Create Command" placement="right">
                <Fab color="secondary" onClick={create} size="small">
                    <Add/>
                </Fab>
            </Tooltip>
            <Tooltip title="Help" placement="right">
                <IconButton size="small" onClick={help}>
                    <HelpOutline/>
                </IconButton>
            </Tooltip>
        </Fragment>
    );
};

/** REDUX MAPS */
const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    create: () => d(createCommand()),
    help: () => d(toggleHelp()),
});

export default connect(null, mapDispatchToProps)(Controls);
