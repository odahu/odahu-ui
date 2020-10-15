import {Config} from "../../models/odahuflow/Config";
import {ApplicationState} from "../index";


export interface ConfigurationState {
    readonly loading: boolean;
    readonly data: Config;
    readonly error?: string;
}

export const createKibanaEnabledSelector = () => (state: ApplicationState): boolean =>
    state.configuration.data.common?.externalUrls
        ?.map((i) => i.name === 'Kibana')
        .indexOf(true) !== -1

export const defaultPackagingResourcesSelector = (state: ApplicationState) =>
    state.configuration.data.packaging?.defaultResources

export const defaultPackagingOutputConnection = (state: ApplicationState) =>
    state.configuration.data.packaging?.outputConnectionID

export const defaultDeploymentResourcesSelector = (state: ApplicationState) =>
    state.configuration.data.deployment?.defaultResources

export const defaultDeploymentImagePullConnSelector = (state: ApplicationState) =>
    state.configuration.data.deployment?.defaultDockerPullConnName
