import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParameterView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/CustomTextField";


export function extractConnectionECRViewParams(conn: Connection): Array<ViewParam> {
    return [
        {name: "Region", elem: conn.spec?.region},
        {name: "Access Key ID", elem: conn.spec?.keyID},
        {name: "Access Key Secret", elem: conn.spec?.keySecret}
    ];
}

export const ConnectionECRSchema = Yup.object().shape({
    type: Yup.string().oneOf(Object.values<string>(ConnectionTypes)).required(),
    uri: Yup.string().required('URI is a required field'),
    keySecret: Yup.string().required('Access Key Secret is a required field'),
    keyID: Yup.string().required('Access Key ID is a required field'),
    region: Yup.string(),
});

export const ConnectionECRStep: React.FC = () => {
    return (
        <>
            <OdahuTextField
                name="spec.uri"
                label="URI"
                description='The url must have the following format, aws_account_id.dkr.ecr.`region`.amazonaws.com/some-prefix'
            />
            <OdahuTextField
                name="spec.region"
                label="Region"
            />
            <FormikSecretTextField
                name="spec.keyID"
                label="Access Key ID"
                description='access key ID (for example, "AKIAIOSFODNN7EXAMPLE").'
            />
            <FormikSecretTextField
                name="spec.keySecret"
                label="Access Key Secret"
                description='secret access key (for example, "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY").'
            />
        </>
    )
};
