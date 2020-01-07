import * as Yup from "yup";
import {IDSchema} from "../../../components/fields";

export const PackagingMetaSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        integrationName: Yup.string().required('Integration name is a required field'),
        outputConnection: Yup.string(),
    }),
});

// TODO: refactor
export const PackagingSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        integrationName: Yup.string().required('Integration name is a required field'),
        outputConnection: Yup.string(),
        artifactName: Yup.string().required('Artifact name is a required field'),
        targets: Yup.array().of(
            Yup.object().shape({
                connectionName: Yup.string().required('Connection ID is a required field'),
                name: Yup.string().required('Target name is a required field'),
            }),
        ),
        arguments: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Connection ID is a required field'),
                value: Yup.string().required('Target name is a required field'),
            }),
        ),
    }),
});
