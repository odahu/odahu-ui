import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParameterView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/CustomTextField";


export function extractConnectionAzureBlobViewParams(conn: Connection): Array<ViewParam> {
    return [
        {name: "Shared Access Signature URL", elem: conn.spec?.keySecret}
    ];
}

export const ConnectionAzureBlobSchema = Yup.object().shape({
    type: Yup.string().oneOf(Object.values<string>(ConnectionTypes)).required(),
    uri: Yup.string().required('Shared Access Signature URL is a required field'),
    keySecret: Yup.string().required(''),
});

export const ConnectionAzureBlobStep: React.FC = () => {
    return (
        <>
            <OdahuTextField
                name="spec.uri"
                label="URI"
                description="Azure storage compatible URI, for example <bucket-name>/dir1/dir2/"
            />
            <FormikSecretTextField
                name='spec.keySecret'
                label="SAS Token"
                description='Shared access signatures, format: “<primary_blob_endpoint>/<sas_token>”'
            />
        </>
    )
};
