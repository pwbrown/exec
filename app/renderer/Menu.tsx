/** REACT */
import React, { FC, useState } from "react";

/** MATERIAL */
import Add from "@material-ui/icons/Add";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";

const Menu: FC = () => {
    const [dialIsOpen, setDialState] = useState(false);
    const open = () => setDialState(true);
    const close = () => setDialState(false);
    const toggle = () => setDialState(!dialIsOpen);
    return (
        <SpeedDial
            ariaLabel="Actions"
            open={dialIsOpen}
            direction="right"
            icon={<SpeedDialIcon/>}
            onMouseEnter={open}
            onMouseLeave={close}
            onClick={toggle}
            onFocus={open}
            onBlur={close}
        >
            <SpeedDialAction
                tooltipTitle="New Command"
                tooltipPlacement="bottom"
                icon={<Add/>}
            />
        </SpeedDial>
    );
};

export default Menu;
