import React, {useContext} from 'react';
import {Autocomplete, UseAutocompleteProps} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import {editPageStyles, FieldsOptions, FieldsOptionsContext} from "./EditablePage";
import {calculateFormikFieldProperties, FormikProperties} from "./FormikProperties";
import {useFormikContext} from "formik";

export type FormikOdahuAutocompleteProps = FormikProperties & OdahuAutocompleteProps;

/**
 * The proxy component for material UI TextField
 */
export const FormikOdahuAutocomplete: React.FC<FormikOdahuAutocompleteProps> = (
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
        <OdahuAutocomplete
            {...calculateFormikFieldProperties(formik, fieldsOptions, name, description)}
            {...otherProps}
        >
            {children}
        </OdahuAutocomplete>
    )
};

export interface OdahuAutocompleteProps {
    label: string;
    // The list of options
    options: any[];
    name: string;
    onChange?: UseAutocompleteProps['onChange'];
    value?: UseAutocompleteProps['value'];
    // If true, the label will be displayed in an error state
    error?: boolean;
    // Error or description text
    helperText?: string;
    className?: string;
}

/**
 * The proxy component for material UI Autocomplete
 */
export const OdahuAutocomplete: React.FC<OdahuAutocompleteProps> = (
    {className, options, name, value, label,error, helperText}
) => {
    const classes = editPageStyles();
    const formik = useFormikContext();

    return (
        <Autocomplete
            freeSolo
            className={className ?? classes.fields}
            onChange={(event, newValue) => {
                formik.setFieldValue(name, newValue ?? "");
            }}
            value={value}
            options={options}
            renderInput={params => (
                <TextField {...params}
                           name={name}
                           onChange={formik.handleChange}
                           error={error}
                           helperText={helperText}
                           label={label}
                           margin="normal"
                           fullWidth
                />
            )}
        />
    )
};
