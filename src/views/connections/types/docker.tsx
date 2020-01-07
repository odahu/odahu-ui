import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParameterView";
import * as Yup from "yup";
import {FormikSecretTextField} from "../../../components/SecretTextField";
import {ConnectionTypes} from "./index";
import {OdahuTextField} from "../../../components/CustomTextField";


export function extractConnectionDockerViewParams(conn: Connection): Array<ViewParam> {
    return [
        {name: "Username", elem: conn.spec?.username},
        {name: "Password", elem: conn.spec?.password}
    ];
}

export const ConnectionDockerSchema = Yup.object().shape({
    uri: Yup.string().required('URI is a required field'),
    type: Yup.string().oneOf(Object.values<string>(ConnectionTypes)).required(),
    username: Yup.string().required('Username is a required field'),
    password: Yup.string().required('Password is a required field'),
});

export const ConnectionDockerStep: React.FC = () => {
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
