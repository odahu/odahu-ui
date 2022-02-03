import React, {useContext} from 'react';
import {InputProps} from "@material-ui/core/Input/Input";
import {FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {useFormikContext} from "formik";
import {FieldsOptions, FieldsOptionsContext} from "./EditablePage";
import {calculateFormikFieldProperties, FormikProperties} from "./FormikProperties";
import {useFieldsStyles} from "./fields";

export type FormikSecretTextFieldProps = FormikProperties & SecretTextFieldProps;

export const FormikSecretTextField: React.FC<FormikSecretTextFieldProps> = (
    {
        name,
        description,
        children,
        ...otherProps
    }
) => {
    const formik = useFormikContext();
    const fieldsOptions = useContext<FieldsOptions>(FieldsOptionsContext);

    return (
        <SecretTextField
            {...calculateFormikFieldProperties(formik, fieldsOptions, name, description)}
            {...otherProps}
        >
            {children}
        </SecretTextField>
    )
};

export type SecretTextFieldProps = {
    label: string;
    error?: boolean;
    helperText?: string;
    required?: boolean;
} & InputProps;

export const SecretTextField: React.FC<SecretTextFieldProps> = ({className, error, helperText, label, required, ...otherProps}) => {
    const classes = useFieldsStyles();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormControl className={className ?? classes.fields} error={error} required={required}>
            <InputLabel>{label}</InputLabel>
            <Input
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle visibility"
                            onClick={handleClickShowPassword}
                        >
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                }
                {...otherProps}
            />
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
        </FormControl>
    )
};
