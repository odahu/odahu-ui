import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";

export interface ModelDeploymentState {
    readonly loading: boolean;
    readonly data: Record<string, ModelDeployment>;
    readonly length: number;
    readonly error?: string;
}
