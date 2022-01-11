import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParametersView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionSpecPlugin, ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {useFieldsStyles} from "../../../components/fields";
import {hidingSequence} from "../../../utils/sensitive";
import { ConnectionCheckbox } from "../../../components/ConnectionCheckbox";


export function extractViewParameters(conn: Connection): Array<ViewParam> {
    return [
        {name: "Region", elem: conn.spec?.region},
        {name: "Access Key ID", elem: hidingSequence},
        {name: "Access Key Secret", elem: hidingSequence},
        {name: "Vital", elem: conn.spec?.vital? "true": "false"}
    ];
}

export const Schema = {
    uri: Yup.string().trim().required('URI is a required field'),
    keySecret: Yup.string().trim().required('Access Key Secret is a required field'),
    keyID: Yup.string().trim().required('Access Key ID is a required field'),
    region: Yup.string().trim(),
    vital: Yup.string().trim(),
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
                description='Base64-encoded access key ID (for example, "QUtJQUlPU0ZPRE5ON0VYQU1QTEU=").'
            />
            <FormikSecretTextField
                className={classes.editorField}
                name="spec.keySecret"
                label="Access Key Secret"
                description='Base64-encoded secret access key (for example, "d0phbHJYVXRuRkVNSS9LN01ERU5HL2JQeFJmaUNZRVhBTVBMRUtFWQ==").'
            />
            <ConnectionCheckbox
                name="spec.vital"
                label={'Vital:'}
                description={'Is connection vital'}
            ></ConnectionCheckbox>
        </>
    )
};

export const ConnectionECRSpecPlugin: ConnectionSpecPlugin = {
    type: ConnectionTypes.ECR,
    schemaFields: Schema,
    readonlyViewParameters: extractViewParameters,
    editableFields: <EditableFields/>,
};
