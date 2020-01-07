import React from "react";
import {Connection} from "../../../models/odahuflow/Connection";
import {ParameterView, ViewParam} from "../../../components/ParameterView";
import {ConnectionS3Schema, extractConnectionS3ViewParams} from "./s3";
import {ConnectionGCSSchema, extractConnectionGCSViewParams} from "./gcs";
import * as Yup from 'yup';
import {ConnectionSpec} from "../../../models/odahuflow/ConnectionSpec";
import {ConnectionGITSchema, extractConnectionGitViewParams} from "./git";
import {ConnectionTypes} from "./index";
import {ConnectionAzureBlobSchema, extractConnectionAzureBlobViewParams} from "./azureblob";
import {ConnectionDockerSchema, extractConnectionDockerViewParams} from "./docker";
import {ConnectionECRSchema, extractConnectionECRViewParams} from "./ecr";
import {IDSchema} from "../../../components/fields";

// TODO: refactor
export const ConnectionSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.lazy((spec?: ConnectionSpec) => {
        switch (spec?.type) {
            case ConnectionTypes.GCS:
                return ConnectionGCSSchema;
            case ConnectionTypes.S3:
                return ConnectionS3Schema;
            case ConnectionTypes.GIT:
                return ConnectionGITSchema;
            case ConnectionTypes.AZUREBLOB:
                return ConnectionAzureBlobSchema;
            case ConnectionTypes.DOCKER:
                return ConnectionDockerSchema;
            case ConnectionTypes.ECR:
                return ConnectionECRSchema;
            default:
                return Yup.object();
        }
    }),
});

export const ConnectionMetaSchema = Yup.object().shape({
    id: Yup.string().required(),
    spec: Yup.object().shape({
        type: Yup.string().oneOf(Object.values<string>(ConnectionTypes)).required(),
    }),
});

export interface ConnectionViewProps {
    connection: Connection;
}

export const ConnectionView: React.FC<ConnectionViewProps> = (({connection}) => {
    let parameters: Array<ViewParam> = [
        {name: "ID", elem: connection.id},
        {name: "Type", elem: connection.spec?.type},
        {name: "Description", elem: connection.spec?.description},
        {name: "WEB UI Link", elem: connection.spec?.webUILink},
        {name: "URI", elem: connection.spec?.uri},
    ];

    switch (connection.spec?.type) {
        case ConnectionTypes.S3: {
            parameters = parameters.concat(extractConnectionS3ViewParams(connection));
            break;
        }
        case ConnectionTypes.GCS: {
            parameters = parameters.concat(extractConnectionGCSViewParams(connection));
            break;
        }
        case ConnectionTypes.GIT: {
            parameters = parameters.concat(extractConnectionGitViewParams(connection));
            break;
        }
        case ConnectionTypes.AZUREBLOB: {
            parameters = parameters.concat(extractConnectionAzureBlobViewParams(connection));
            break;
        }
        case ConnectionTypes.DOCKER: {
            parameters = parameters.concat(extractConnectionDockerViewParams(connection));
            break;
        }
        case ConnectionTypes.ECR: {
            parameters = parameters.concat(extractConnectionECRViewParams(connection));
            break;
        }
    }

    return (
        <ParameterView params={parameters}/>
    )
});
