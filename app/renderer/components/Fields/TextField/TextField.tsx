/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import FormGroup from '@material-ui/core/FormGroup';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const TextField: FC<TextFieldProps> = (props) => {
    return (
        <FormGroup>
            <Typography>{props.label || ''}{props.required ? ' *' : ''}</Typography>
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