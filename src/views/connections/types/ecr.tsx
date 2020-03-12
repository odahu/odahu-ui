import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParametersView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionSpecPlugin, ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {useFieldsStyles} from "../../../components/fields";


export function extractViewParameters(conn: Connection): Array<ViewParam> {
    return [
        {name: "Region", elem: conn.spec?.region},
        {name: "Access Key ID", elem: conn.spec?.keyID},
        {name: "Access Key Secret", elem: conn.spec?.keySecret}
    ];
}

export const Schema = {
    uri: Yup.string().required('URI is a required field'),
    keySecret: Yup.string().required('Access Key Secret is a required field'),
    keyID: Yup.string().required('Access Key ID is a required field'),
    region: Yup.string(),
};

export const EditableFields: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <>
            <OdahuTextField
                className={classes.editorField}
                name="spec.uri"
                label="URI"
                description='The url must have the following format, aws_account_id.dkr.ecr.`region`.amazonaws.com/some-prefix'
            />
            <OdahuTextField
                className={classes.editorField}
                name="spec.region"
                label="Region"
            />
            <FormikSecretTextField
                className={classes.editorField}
                name="spec.keyID"
                label="Access Key ID"
                description='access key ID (for example, "AKIAIOSFODNN7EXAMPLE").'
            />
            <FormikSecretTextField
                className={classes.editorField}
                name="spec.keySecret"
                label="Access Key Secret"
                description='secret access key (for example, "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY").'
            />
        </>
    )
};

export const ConnectionECRSpecPlugin: ConnectionSpecPlugin = {
    type: ConnectionTypes.ECR,
    schemaFields: Schema,
    readonlyViewParameters: extractViewParameters,
    editableFields: <EditableFields/>,
};
