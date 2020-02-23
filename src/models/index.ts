import * as Yup from "yup";

export const ResourceListSchema = Yup.object().shape({
    cpu: Yup.string(),
    memory: Yup.string(),
    gpu: Yup.string(),
});

export const ResourceRequirementsSchema = Yup.object().shape({
    limits: ResourceListSchema,
    requests: ResourceListSchema,
});
