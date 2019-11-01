/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import MuiSelect, { SelectProps } from '@material-ui/core/Select';

/** FIELDS */
import Label, { ILabelProps } from '../Label/Label';

/** PROPS */
interface IOption { label?: string; value: string; }
interface IProps extends SelectProps, ILabelProps {
    label?: string;
    helperText?: string;
    hasError?: boolean;
    errorText?: string;
    emptyOption?: string;
    options?: IOption[];
}

const Select: FC<IProps> = (props) => {
    let helperText = props.helperText || '';
    if (props.hasError) {
        helperText = 'This field is required.';
        if (props.value && props.errorText) {
            helperText = props.errorText;
        }
    }
    const renderHelperText = () => !helperText ? '' : (
        <FormHelperText
            variant='outlined'
            margin='dense'
            disabled={props.disabled}
            error={props.hasError}
        >
            {helperText}
        </FormHelperText>
    );
    const renderOptions = () => !props.options ? '' :
        props.options.map((opt) => (
            <MenuItem value={opt.value} key={opt.value}>
                {opt.label || opt.value}
            </MenuItem>
        ));
    return (
        <FormGroup>
            <Label required={props.required} help={props.help}>{props.label || ''}</Label>
            <MuiSelect
                {...props}
                required={undefined}
                margin='dense'
                variant='outlined'
                error={props.hasError}
            >
                {props.emptyOption ? <MenuItem value=''>{props.emptyOption}</MenuItem> : ''}
                {renderOptions()}
                {props.children}
            </MuiSelect>
            {renderHelperText()}
        </FormGroup>
    );
};

export default Select;
