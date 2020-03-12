import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParametersView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionSpecPlugin, ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {useFieldsStyles} from "../../../components/fields";


function extractViewParameters(conn: Connection): Array<ViewParam> {
    return [
        {name: "Shared Access Signature URL", elem: conn.spec?.keySecret}
    ];
}

const Schema = {
    uri: Yup.string().required('Shared Access Signature URL is a required field'),
    keySecret: Yup.string().required('Shared Access Token is a required field'),
};

const EditableFields: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <>
            <OdahuTextField
                className={classes.editorField}
                name="spec.uri"
                label="URI"
                description="Azure storage compatible URI, for example <bucket-name>/dir1/dir2/"
            />
            <FormikSecretTextField
                className={classes.editorField}
                name='spec.keySecret'
                label="SAS Token"
                description='Shared access signatures, format: “<primary_blob_endpoint>/<sas_token>”'
            />
        </>
    )
};

export const ConnectionAzureBlobSpecPlugin: ConnectionSpecPlugin = {
    type: ConnectionTypes.AZUREBLOB,
    schemaFields: Schema,
    readonlyViewParameters: extractViewParameters,
    editableFields: <EditableFields/>,
};
