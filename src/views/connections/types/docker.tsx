import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParametersView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionSpecPlugin, ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {useFieldsStyles} from "../../../components/fields";
import {hidingSequence} from "../../../utils/sensitive";
import { OdahuCheckbox } from "../../../components/ConnectionCheckbox";


export function extractViewParameters(conn: Connection): Array<ViewParam> {
    return [
        {name: "Username", elem: conn.spec?.username},
        {name: "Password", elem: hidingSequence},
        {name: "Vital", elem: conn.spec?.vital? "true": "false"}
    ];
}

export const Schema = {
    uri: Yup.string().trim().required('URI is a required field'),
    username: Yup.string().trim().required('Username is a required field'),
    password: Yup.string().trim().required('Password is a required field'),
    vital: Yup.boolean(),
};

export const EditableFields: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <>
            <OdahuTextField
                className={classes.editorField}
                name="spec.uri"
                label="URI"
                description="Docker registry host, for example: gcr.io/project/odahuflow"
            />
            <OdahuTextField
                className={classes.editorField}
                name="spec.username"
                label="Username"
                description='Docker registry username'
            />
            <FormikSecretTextField
                className={classes.editorField}
                name="spec.password"
                label="Password"
                description="Base64-encoded Docker registry password"
            />
            <OdahuCheckbox
                name="spec.vital"
                label={'Vital:'}
                description={'Is connection vital'}
            ></OdahuCheckbox>
        </>
    )
};

export const ConnectionDockerSpecPlugin: ConnectionSpecPlugin = {
    type: ConnectionTypes.DOCKER,
    schemaFields: Schema,
    readonlyViewParameters: extractViewParameters,
    editableFields: <EditableFields/>,
};
