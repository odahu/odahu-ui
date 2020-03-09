import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParametersView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionSpecPlugin, ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {FormikOdahuAutocomplete} from "../../../components/OdahuAutocomplete";
import {useFieldsStyles} from "../../../components/fields";


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

const MOST_POPULAR_GIT_BRANCHES = ["master", "develop"];
export const EditableFields: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <>
            <OdahuTextField
                className={classes.editorField}
                name="spec.uri"
                label="Git SSH URL"
                description='GIT SSH URL, for example git@github.com:odahu/odahu-examples.git'
            />
            <FormikOdahuAutocomplete
                className={classes.editorField}
                name="spec.reference"
                label="Reference"
                options={MOST_POPULAR_GIT_BRANCHES}
                description='a branch, tag, or commit'
            />
            <FormikSecretTextField
                className={classes.editorField}
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
