import * as Yup from "yup";
import {IDSchema} from "../../../components/fields";
import {isValidLabel} from "../../../utils/enities";

export const TrainingMetaSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        image: Yup.string().trim(),
        toolchain: Yup.string().trim().required('Toolchain is a required field'),
        model: Yup.object().shape({
            name: Yup.string().trim().required('Model name is a required field')
                .test('name', "Model name is not valid", isValidLabel),
            version: Yup.string().trim().required('Model version is a required field')
                .test('spec.model.version', "Model version is not valid", isValidLabel),
        }),
    }),
});

export const TrainingSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        image: Yup.string().trim(),
        model: Yup.object().shape({
            name: Yup.string().trim().required('Model name is a required field')
                .test('name', "Model name is not valid", isValidLabel),
            version: Yup.string().trim().required('Model version is a required field')
                .test('spec.model.version', "Model version is not valid", isValidLabel),
        }),
        entrypoint: Yup.string().trim().required('Entrypoint is a required field'),
        vcsName: Yup.string().trim().required('VCS ID is a required field'),
        toolchain: Yup.string().trim().required('Toolchain is a required field'),
        envs: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().trim().required('Name is a required field'),
                value: Yup.string().trim().required('Value is a required field'),
            })
        ),
        data: Yup.array().of(
            Yup.object().shape({
                connName: Yup.string().trim().required('Connection ID is a required field'),
                localPath: Yup.string().trim().required('Target path is a required field'),
                remotePath: Yup.string().trim()
            }),
        ),
        hyperParameters: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().trim().required('Name is a required field'),
                value: Yup.string().required('Value is a required field'),
            }),
        ),
    }),
});
