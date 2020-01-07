import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParameterView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/CustomTextField";


export function extractConnectionGitViewParams(conn: Connection): Array<ViewParam> {
    return [
        {name: "Reference", elem: conn.spec?.reference},
        {name: "SSH private key", elem: conn.spec?.keySecret}
    ];
}

export const ConnectionGITSchema = Yup.object().shape({
    type: Yup.string().oneOf(Object.values<string>(ConnectionTypes)).required(),
    uri: Yup.string().required('Required field'),
    keySecret: Yup.string().required('Required field'),
    reference: Yup.string(),
});

export const ConnectionGitStep: React.FC = () => {

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
