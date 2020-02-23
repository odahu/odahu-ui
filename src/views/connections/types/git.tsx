import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParametersView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionSpecPlugin, ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/CustomTextField";


export function extractViewParameters(conn: Connection): Array<ViewParam> {
    return [
        {name: "Reference", elem: conn.spec?.reference},
        {name: "SSH private key", elem: conn.spec?.keySecret}
    ];
}

export const Schema = {
    uri: Yup.string().required('GIT URL is a required field'),
    keySecret: Yup.string().required('SSH private key is a required field'),
    reference: Yup.string(),
};

export const EditableFields: React.FC = () => {
    return (
        <>
            <OdahuTextField
                name="spec.uri"
                label="Git SSH URL"
                description='GIT SSH URL, for example git@github.com:odahu/odahu-examples.git'
            />
            <OdahuTextField
                name="spec.reference"
                label="Reference"
                description='a branch, tag, or commit'
            />
            <FormikSecretTextField
                name="spec.keySecret"
                label="SSH private key"
                description='base64 encoded SSH private key'
            />
        </>
    )
};

export const ConnectionGITSpecPlugin: ConnectionSpecPlugin = {
    type: ConnectionTypes.GIT,
    schemaFields: Schema,
    readonlyViewParameters: extractViewParameters,
    editableFields: <EditableFields/>,
};
