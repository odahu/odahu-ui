import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParametersView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionSpecPlugin, ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {FormikOdahuAutocomplete} from "../../../components/OdahuAutocomplete";
import {useFieldsStyles} from "../../../components/fields";
import {hidingSequence} from "../../../utils/sensitive";
import { MuiThemeProvider } from "@material-ui/core";
import { asterisksStyle } from "../../common_styles/asterisks-theme";
import { OdahuCheckbox } from "../../../components/OdahuCheckbox";


export function extractViewParameters(conn: Connection): Array<ViewParam> {
    return [
        {name: "Reference", elem: conn.spec?.reference},
        {name: "SSH private key", elem: hidingSequence},
        {name: "Vital", elem: conn.spec?.vital? "true": "false"}
    ];
}

export const Schema = {
    uri: Yup.string().trim().required('GIT URL is a required field'),
    keySecret: Yup.string().trim().required('SSH private key is a required field'),
    reference: Yup.string().trim(),
    vital: Yup.boolean(),
};

const MOST_POPULAR_GIT_BRANCHES = ["master", "develop"];
export const EditableFields: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <>
            <MuiThemeProvider theme={asterisksStyle}>
                <OdahuTextField
                    className={classes.editorField}
                    name="spec.uri"
                    label="Git SSH URL"
                    description='GIT SSH URL, for example git@github.com:odahu/odahu-examples.git'
                    required
                />
                <FormikOdahuAutocomplete
                    className={classes.editorField}
                    name="spec.reference"
                    label="Reference"
                    options={MOST_POPULAR_GIT_BRANCHES}
                    description='a branch, tag, or commit'
                />
                <FormikSecretTextField
                    className={classes.editorField}
                    name="spec.keySecret"
                    label="SSH private key"
                    description='base64 encoded SSH private key'
                    required
                />
                <OdahuCheckbox
                    name="spec.vital"
                    label={'Vital:'}
                    description={'Is connection vital'}
                ></OdahuCheckbox>
            </MuiThemeProvider>
        </>
    )
};

export const ConnectionGITSpecPlugin: ConnectionSpecPlugin = {
    type: ConnectionTypes.GIT,
    schemaFields: Schema,
    readonlyViewParameters: extractViewParameters,
    editableFields: <EditableFields/>,
};
