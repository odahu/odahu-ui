import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps} from "@material-ui/core";
import clsx from "clsx";
import React, {useContext} from "react";
import {editPageStyles, FieldsOptions, FieldsOptionsContext} from "./EditablePage";
import {useFormikContext} from "formik";
import {calculateFormikFieldProperties, FormikProperties} from "./FormikProperties";

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

export interface OdahuSelectProps {
    label: string;
    name: string;
    options: any[];
    onChange?: SelectProps['onChange'];
    value?: unknown;
    defaultValue?: SelectProps['defaultValue'];
    error?: boolean;
    helperText?: string;
    style?: React.CSSProperties;
}

/**
 * The proxy component for material UI Select
 */
export const OdahuSelect: React.FC<OdahuSelectProps> = (
    {
        label,
        name,
        onChange,
        value,
        defaultValue,
        error,
        helperText,
        style,
        options,
    }
) => {
    const classes = editPageStyles();

    return (
        <FormControl
            style={style}
            className={clsx(classes.formControl, classes.fields)}
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
