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