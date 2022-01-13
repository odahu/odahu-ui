import React from "react";
import { Checkbox, createStyles, makeStyles } from "@material-ui/core"
import { getIn, useFormikContext } from "formik";

export interface OdahuCheckboxProps {
    name: string;
    label: string;
    description: string;
}

const useOdahuCheckboxStyles = makeStyles(() =>
    createStyles({
        root: {
            position: 'relative',
            margin: '20px',
        },
        paragraph: {
            margin: 0, 
        },
        helperText: {
            color: 'rgba(0, 0, 0, 0.54)',
            fontSize: '0.75rem',
            minHeight: '1em',
            textAlign: 'left',
            lineHeight: '1em',
            letterSpacing: '0.03333em',
        },
        title: {
            color: 'rgba(0, 0, 0, 0.54)',
            fontSize: '1rem',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 400,
            lineHeight: '1em',
            letterSpacing: '0.00938em',
        },
        description: {
            position: 'absolute',
            top: 16,
            left: 0
        }
    }),
);

export const OdahuCheckbox: React.FC<OdahuCheckboxProps> = ({name, label, description}) => {
    const classes = useOdahuCheckboxStyles();
    const formik = useFormikContext();
    const value = getIn(formik.values, name);
    
    return (
    <div className={classes.root}>
        <label className={classes.paragraph}>
            <span className={classes.title}>{label}</span>
            <Checkbox
                checked={value}
                onChange={(event, value) => {
                    formik.setFieldValue(name, value);
                }}
            ></Checkbox>
        </label>
        <p className={(classes.paragraph, classes.description)}>
            <span className={classes.helperText}>{description}</span>
        </p>
    </div>
    )
};
