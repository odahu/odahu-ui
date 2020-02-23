import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParametersView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionSpecPlugin, ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/CustomTextField";


export function extractViewParameters(conn: Connection): Array<ViewParam> {
    return [
        {name: "Username", elem: conn.spec?.username},
        {name: "Password", elem: conn.spec?.password}
    ];
}

export const Schema = {
    uri: Yup.string().required('URI is a required field'),
    username: Yup.string().required('Username is a required field'),
    password: Yup.string().required('Password is a required field')
};

export const EditableFields: React.FC = () => {
    return (
        <>
            <OdahuTextField
                name="spec.uri"
                label="URI"
                description="Docker registry host, for example: gcr.io/project/odahuflow"
            />
            <FormikSecretTextField
                name="spec.username"
                label="Username"
                description='Docker registry username'
            />
            <FormikSecretTextField
                name="spec.password"
                label="Password"
                description="Docker registry password"
            />
        </>
    )
};

export const ConnectionDockerSpecPlugin: ConnectionSpecPlugin = {
    type: ConnectionTypes.DOCKER,
    schemaFields: Schema,
    readonlyViewParameters: extractViewParameters,
    editableFields: <EditableFields/>,
};
