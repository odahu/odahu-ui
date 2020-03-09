import {TextField} from "@material-ui/core";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";
import React, {useContext} from "react";
import {useFormikContext} from "formik";
import {FieldsOptions, FieldsOptionsContext} from "./EditablePage";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {calculateFormikFieldProperties, FormikProperties} from "./FormikProperties";

const useFieldsStyles = makeStyles(() =>
    createStyles({
        fields: {
            margin: '20px'
        }
    }),
);

export type OdahuTextFieldProps = FormikProperties & TextFieldProps;

export const OdahuTextField: React.FC<OdahuTextFieldProps> = (
    {
        name,
        description,
        className,
        ...otherProps
    }
) => {
    const classes = useFieldsStyles();
    const formik = useFormikContext();
    const fieldsOptions = useContext<FieldsOptions>(FieldsOptionsContext);

    return (
        <TextField
            className={className !== undefined ? className : classes.fields}
            {...calculateFormikFieldProperties(formik, fieldsOptions, name, description)}
            {...otherProps}
        />
    )
};
