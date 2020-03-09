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
        {name: "Project", elem: conn.spec?.region},
        {name: "Service Account Key", elem: conn.spec?.keySecret}
    ];
}

export const Schema = {
    uri: Yup.string().required('URI is a required field'),
    region: Yup.string().required('Project is a required field'),
    keySecret: Yup.string().required('Service account key is a required field'),
};


export const EditableFields: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <>
            <OdahuTextField
                className={classes.editorField}
                name="spec.region"
                label="Project"
                description='GCP Project, where a bucket was created'
            />
            <OdahuTextField
                className={classes.editorField}
                name="spec.uri"
                label="URI"
                description='GCS compatible URI, for example gcs://<bucket-name>/dir1/dir2/'
            />
            <FormikSecretTextField
                className={classes.editorField}
                name="spec.keySecret"
                label="Service account secret"
                description='Service account key in json format'
            />
        </>
    )
};

export const ConnectionGCSSpecPlugin: ConnectionSpecPlugin = {
    type: ConnectionTypes.GCS,
    schemaFields: Schema,
    readonlyViewParameters: extractViewParameters,
    editableFields: <EditableFields/>,
};
