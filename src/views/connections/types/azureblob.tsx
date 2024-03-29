import React from "react";
import {ViewParam} from "../../../components/ParametersView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionSpecPlugin, ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {useFieldsStyles} from "../../../components/fields";
import {hidingSequence} from "../../../utils/sensitive";
import {Connection} from "../../../models/odahuflow/Connection";
import { OdahuCheckbox } from "../../../components/OdahuCheckbox";
import { MuiThemeProvider } from "@material-ui/core";
import { asterisksStyle } from "../../common_styles/asterisks-theme";


function extractViewParameters(conn: Connection): Array<ViewParam> {
    return [
        {name: "Shared Access Signature URL", elem: hidingSequence},
        {name: "Vital", elem: conn.spec?.vital? "true": "false"}
    ];
}

const Schema = {
    uri: Yup.string().trim().required('Shared Access Signature URL is a required field'),
    keySecret: Yup.string().trim().required('Shared Access Token is a required field'),
    vital: Yup.boolean(),
};

const EditableFields: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <>
            <MuiThemeProvider theme={asterisksStyle}>
                <OdahuTextField
                    className={classes.editorField}
                    name="spec.uri"
                    label="URI"
                    description="Azure storage compatible URI, for example <bucket-name>/dir1/dir2/"
                    required
                />
                <FormikSecretTextField
                    className={classes.editorField}
                    name='spec.keySecret'
                    label="SAS Token"
                    description='The Shared Access Signatures key has the following format:
                    "<primary_blob_endpoint>/<sas_token>" and must be base64-encoded.'
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

export const ConnectionAzureBlobSpecPlugin: ConnectionSpecPlugin = {
    type: ConnectionTypes.AZUREBLOB,
    schemaFields: Schema,
    readonlyViewParameters: extractViewParameters,
    editableFields: <EditableFields/>,
};
