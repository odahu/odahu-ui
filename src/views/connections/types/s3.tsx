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
import { OdahuCheckbox } from "../../../components/OdahuCheckbox";
import { MuiThemeProvider } from "@material-ui/core";
import { asterisksStyle } from "../../common_styles/asterisks-theme";


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
    region: Yup.string().trim().required('Region is a required field'),
    vital: Yup.boolean(),
};

const ALL_AWS_REGIONS = [
    "us-east-1",
    "us-east-2",
    "us-west-1",
    "us-west-2",
    "ca-central-1",
    "eu-central-1",
    "eu-west-1",
    "eu-west-2",
    "eu-west-3",
    "eu-north-1",
    "me-south-1",
    "sa-east-1",
    "ap-east-1",
    "ap-south-1",
    "ap-southeast-1",
    "ap-southeast-2",
    "ap-northeast-1",
    "ap-northeast-2",
    "ap-northeast-3",
];

export const EditableFields: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <>
            <MuiThemeProvider theme={asterisksStyle}>
                <OdahuTextField
                    className={classes.editorField}
                    name="spec.uri"
                    label="URI"
                    description='S3 compatible URI, for example s3://<bucket-name>/dir1/dir2/'
                    required
                />
                <FormikOdahuAutocomplete
                    className={classes.editorField}
                    name="spec.region"
                    label="Region"
                    options={ALL_AWS_REGIONS}
                    required
                />
                <FormikSecretTextField
                    className={classes.editorField}
                    name="spec.keyID"
                    label="Access Key ID"
                    description='Base64-encoded access key ID (for example, "QUtJQUlPU0ZPRE5ON0VYQU1QTEU=").'
                    required
                />
                <FormikSecretTextField
                    className={classes.editorField}
                    name="spec.keySecret"
                    label="Access Key Secret"
                    description='Base64-encoded secret access key (for example, "d0phbHJYVXRuRkVNSS9LN01ERU5HL2JQeFJmaUNZRVhBTVBMRUtFWQ==").'
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

export const ConnectionS3SpecPlugin: ConnectionSpecPlugin = {
    type: ConnectionTypes.S3,
    schemaFields: Schema,
    readonlyViewParameters: extractViewParameters,
    editableFields: <EditableFields/>,
};
