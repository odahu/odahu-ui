import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as Yup from "yup";
import {isValidID} from "../utils/enities";
import {createMuiTheme} from "@material-ui/core";

export const maxFieldWidth = '500px';
export const fieldMargin = '20px';

export const useFieldsStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        fields: {
            margin: `${fieldMargin} !important`,
        },
        editorField: {
            margin: `${fieldMargin} !important`,
            maxWidth: maxFieldWidth,
            width: maxFieldWidth
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
        },
        "MuiFormLabel-asterisk": {
            color: 'red',
        }
    }),
);

export const formLabelsTheme = createMuiTheme({
    overrides: {
        MuiFormLabel: {
            asterisk: {
                color: '#db3131',
                '&$error': {
                    color: '#db3131'
                },
            }
        }
    }
})

export const IDSchema = Yup.string().required('ID is a required value')
    .test("id", "ID is not valid", isValidID);

