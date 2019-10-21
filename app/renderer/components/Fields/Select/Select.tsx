/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import FormGroup from '@material-ui/core/FormGroup';
import MuiSelect, { SelectProps } from '@material-ui/core/Select';

/** FIELDS */
import Label, { ILabelProps } from '../Label/Label';

/** PROPS */
interface IProps extends SelectProps, ILabelProps {
    label?: string;
}

const Select: FC<IProps> = (props) => {
    return (
        <FormGroup>
            <Label required={props.required} help={props.help}>{props.label || ''}</Label>
            <MuiSelect
                {...props}
                required={undefined}
                margin='dense'
                variant='outlined'
            >
                {props.children}
            </MuiSelect>
        </FormGroup>
    );
};

export default Select;
