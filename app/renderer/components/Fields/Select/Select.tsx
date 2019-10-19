/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import FormGroup from '@material-ui/core/FormGroup';
import MuiSelect, { SelectProps } from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

/** PROPS */
interface IProps extends SelectProps {
    label?: string;
}

const Select: FC<IProps> = (props) => {
    return (
        <FormGroup>
            <Typography>{props.label || ''}{props.required ? ' *' : ''}</Typography>
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
