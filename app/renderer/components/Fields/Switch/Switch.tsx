/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import FormGroup from '@material-ui/core/FormGroup';
import MuiSwitch, { SwitchProps } from '@material-ui/core/Switch';

/** FIELDS */
import Label, { ILabelProps } from '../Label/Label';

/** PROPS */
interface IProps extends SwitchProps, ILabelProps {
    label?: string;
}

const Switch: FC<IProps>  = (props) => {
    return (
        <FormGroup>
            <Label help={props.help} required={props.required}>{props.label}</Label>
            <MuiSwitch {...props} required={undefined}/>
        </FormGroup>
    );
};

export default Switch;
