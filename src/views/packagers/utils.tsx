import {PackagingIntegration} from "../../models/odahuflow/PackagingIntegration";

export interface CommonSchema {
    name: string;
    description: string;
}

export interface BooleanSchema extends CommonSchema {
    type: 'boolean';
    default: boolean;
}

export interface IntegerSchema extends CommonSchema {
    type: 'integer';
    default: number;
}

export interface StringSchema extends CommonSchema {
    type: 'string';
    default: string;
}

export type ParameterSchema = BooleanSchema | IntegerSchema | StringSchema;

export function extractParameters(packager: PackagingIntegration): ParameterSchema[] {
    return packager.spec?.schema?.arguments?.properties?.map(prop => {
        // default properties of resultParam
        const resultParam = {name: prop.name ?? '', type: 'string' as const, default: '', description: ''};
        prop.parameters = prop.parameters ?? [];

        for (const propParam of prop.parameters) {
            switch (propParam.name) {
                case "type":
                    resultParam.type = propParam.value;
                    break;
                case "default":
                    resultParam.default = propParam.value;
                    break;
                case "description":
                    resultParam.description = propParam.value;
                    break;
            }
        }

        return resultParam;
    }) ?? [];
}
