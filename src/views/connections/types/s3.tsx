import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParameterView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/CustomTextField";


export function extractConnectionS3ViewParams(conn: Connection): Array<ViewParam> {
    return [
        {name: "Region", elem: conn.spec?.region},
        {name: "Access Key ID", elem: conn.spec?.keyID},
        {name: "Access Key Secret", elem: conn.spec?.keySecret}
    ];
}

export const ConnectionS3Schema = Yup.object().shape({
    type: Yup.string().oneOf(Object.values<string>(ConnectionTypes)).required(),
    uri: Yup.string().required('URI is a required field'),
    keySecret: Yup.string().required(),
    keyID: Yup.string().required(),
    region: Yup.string().required('Region is a required field'),
});

export const ConnectionS3Step: React.FC = () => {
    return (
        <>
            <OdahuTextField
                name="spec.uri"
                label="URI"
                description='S3 compatible URI, for example s3://<bucket-name>/dir1/dir2/'
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
