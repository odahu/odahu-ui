import * as Yup from "yup";
import {IDSchema} from "../../../components/fields";
import {ResourceRequirementsSchema} from "../../../models";

export const DeploymentSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        image: Yup.string().nullable().required('Image is a required field'),
        livenessProbeInitialDelay: Yup.number().moreThan(0),
        readinessProbeInitialDelay: Yup.number().moreThan(0),
        minReplicas: Yup.number()
            .test('>=', 'Minimum replicas number must not be lower than 0', value => value >= 0),
        maxReplicas: Yup.number()
            .test('>=', 'Maximum replicas number must be greater than 0', value => value >= 1),
        resources: ResourceRequirementsSchema,
    }),
});

export const DeploymentMetaSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        imagePullConnID: Yup.string(),
    }),
});
