import {TextField} from "@material-ui/core";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";
import React, {useContext} from "react";
import {useFormikContext} from "formik";
import {FieldsOptions, FieldsOptionsContext} from "./EditablePage";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {calculateFormikFieldProperties, FormikProperties} from "./FormikProperties";

export const useFieldsStyles = makeStyles((theme: Theme) =>
    createStyles({
        fields: {
            margin: "20px",
            maxWidth: "30%",
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        cleanupLink: {
            color: 'inherit',
            textDecoration: 'none'
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
