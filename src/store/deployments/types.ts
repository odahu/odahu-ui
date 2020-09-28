import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";
import {ApplicationState} from "../index";

export interface ModelDeploymentState {
    readonly loading: boolean;
    readonly data: Record<string, ModelDeployment>;
    readonly length: number;
    readonly error?: string;
}

export const MDSSelector = (state: ApplicationState) => state.deployments


export const createMDSelector = (id: string) => (state: ApplicationState): ModelDeployment => {
    const mdState = MDSSelector(state)
    return mdState.data[id] ?? {}
}