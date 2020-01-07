import React from 'react';
import * as Yup from "yup";
import {Connection} from "../../../models/odahuflow/Connection";
import {ViewParam} from "../../../components/ParametersView";

export enum ConnectionTypes {
    GIT = "git",
    S3 = "s3",
    GCS = "gcs",
    AZUREBLOB = "azureblob",
    DOCKER = "docker",
    ECR = "ecr",
}

/**
 * TODO: add
 */
export interface ConnectionSpecPlugin {
    type: ConnectionTypes;
    /**
     * Yup schema for a specific connection type.
     * The schema must not contain the type field.
     */
    schemaFields: Yup.ObjectSchemaDefinition<any>;
    /**
     * Function that returns a list of parameters for a specific connection type.
     */
    readonlyViewParameters: (conn: Connection) => Array<ViewParam>;
    /**
     * This view contains a list of editable parameters(TextField, Select) for a specific connection type.
     */
    editableFields: React.ReactElement;
}
