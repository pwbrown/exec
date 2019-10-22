/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import FormGroup from '@material-ui/core/FormGroup';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';

/** FIELDS */
import Label, { ILabelProps } from '../Label/Label';

/** PROPS */
type IProps = TextFieldProps & ILabelProps & {
    hasError?: boolean;
    errorText?: string;
};

const TextField: FC<IProps> = (props) => {
    let helperText = props.helperText || '';
    if (props.hasError) {
        helperText = 'This field is required.';
        if (props.value && props.errorText) {
            helperText = props.errorText;
        }
    }
    return (
        <FormGroup>
            <Label help={props.help} required={props.required}>{props.label}</Label>
            <MuiTextField
                {...props}
                label={undefined}
                required={undefined}
                variant='outlined'
                helperText={helperText}
                margin='dense'
                error={props.hasError}
            />
        </FormGroup>
    );
};

export default TextField;
