/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import FormGroup from '@material-ui/core/FormGroup';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';

/** FIELDS */
import Label, { ILabelProps } from '../Label/Label';

const TextField: FC<TextFieldProps & ILabelProps> = (props) => {
    return (
        <FormGroup>
            <Label help={props.help} required={props.required}>{props.label}</Label>
            <MuiTextField
                {...props}
                label={undefined}
                required={undefined}
                variant='outlined'
                margin='dense'
            />
        </FormGroup>
    );
};

export default TextField;
