import * as Yup from "yup";

export const ResourceListSchema = Yup.object().shape({
    cpu: Yup.string().trim(),
    memory: Yup.string().trim(),
    gpu: Yup.string().trim(),
});

export const ResourceRequirementsSchema = Yup.object().shape({
    limits: ResourceListSchema,
    requests: ResourceListSchema,
});
