import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps} from "@material-ui/core";
import React, {useContext} from "react";
import {FieldsOptions, FieldsOptionsContext} from "./EditablePage";
import {useFormikContext} from "formik";
import {calculateFormikFieldProperties, FormikProperties} from "./FormikProperties";
import {useFieldsStyles} from "./fields";

export type FormikOdahuSelectProps = FormikProperties & OdahuSelectProps;

export const FormikOdahuSelect: React.FC<FormikOdahuSelectProps> = (
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
        <OdahuSelect
            {...calculateFormikFieldProperties(formik, fieldsOptions, name, description)}
            {...otherProps}
        >
            {children}
        </OdahuSelect>
    )
};

export type OdahuSelectProps = {
    label: string;
    options: any[];
    helperText?: string;
} & SelectProps;

/**
 * The proxy component for material UI Select
 */
export const OdahuSelect: React.FC<OdahuSelectProps> = (
    {
        label,
        name,
        required,
        onChange,
        value,
        defaultValue,
        error,
        helperText,
        options,
        className,
    }
) => {
    const classes = useFieldsStyles();

    return (
        <FormControl
            required={required}
            className={className ?? classes.fields}
            error={error}
        >
            <InputLabel shrink>
                {label}
            </InputLabel>
            <Select
                name={name}
                onChange={onChange}
                value={value}
                defaultValue={defaultValue}
            >
                {options.map(value => (
                    <MenuItem
                        key={value}
                        value={value}
                    >
                        {value}
                    </MenuItem>
                ))}
            </Select>
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
        </FormControl>
    );
};
