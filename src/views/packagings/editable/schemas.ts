import * as Yup from "yup";
import {IDSchema} from "../../../components/fields";

export const PackagingMetaSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        integrationName: Yup.string().trim().required('Integration name is a required field'),
        outputConnection: Yup.string().trim(),
    }),
});

// TODO: refactor
export const PackagingSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        integrationName: Yup.string().trim().required('Integration name is a required field'),
        outputConnection: Yup.string().trim(),
        artifactName: Yup.string().trim().required('Artifact name is a required field'),
        targets: Yup.array().of(
            Yup.object().shape({
                connectionName: Yup.string().trim().required('Connection ID is a required field'),
                name: Yup.string().trim().required('Target name is a required field'),
            }),
        ),
        arguments: Yup.array().nullable().of(
            Yup.object().shape({
                name: Yup.string().trim().required('Argument name is a required field'),
                value: Yup.string().required('Argument value is a required field'),
            }),
        ),
    }),
});
