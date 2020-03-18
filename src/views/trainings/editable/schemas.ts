import * as Yup from "yup";
import {IDSchema} from "../../../components/fields";
import {isValidLabel} from "../../../utils/enities";

export const TrainingMetaSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        image: Yup.string(),
        toolchain: Yup.string().required('Toolchain is a required field'),
        model: Yup.object().shape({
            name: Yup.string().required('Model name is a required field')
                .test('name', "Model name is not valid", isValidLabel),
            version: Yup.string().required('Model version is a required field')
                .test('spec.model.version', "Model version is not valid", isValidLabel),
        }),
    }),
});

export const TrainingSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        image: Yup.string(),
        model: Yup.object().shape({
            name: Yup.string().required('Model name is a required field')
                .test('name', "Model name is not valid", isValidLabel),
            version: Yup.string().required('Model version is a required field')
                .test('spec.model.version', "Model version is not valid", isValidLabel),
        }),
        entrypoint: Yup.string().required('Entrypoint is a required field'),
        toolchain: Yup.string().required('Toolchain is a required field'),
        envs: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Name is a required field'),
                value: Yup.string().required('Value is a required field'),
            })
        ),
        data: Yup.array().of(
            Yup.object().shape({
                connName: Yup.string().required('Connection ID is a required field'),
                localPath: Yup.string().required('Target path is a required field'),
                remotePath: Yup.string()
            }),
        ),
        hyperParameters: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Name is a required field'),
                value: Yup.string().required('Value is a required field'),
            }),
        ),
    }),
});
