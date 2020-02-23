import {FormikComputedProps, FormikHandlers, FormikState} from "formik";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as Yup from "yup";

export type FormikHelper<T = any> = FormikState<T> & FormikHandlers & FormikComputedProps<T>

export const useFieldsStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
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
        },
        paperHeader: {
            margin: '15px 10px 10px 20px'
        },
        helperText: {
            color: 'rgba(0, 0, 0, 0.54)',
            margin: '5px 10px 10px 20px',
            fontSize: '0.75rem',
            marginTop: '8px',
            minHeight: '1em',
            textAlign: 'left',
            lineHeight: '1em',
            letterSpacing: '0.03333em',
        }
    }),
);

export const IDSchema = Yup.string().required('ID is a required value');

