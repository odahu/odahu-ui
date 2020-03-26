import {Config} from "../../models/odahuflow/Config";


export interface ConfigurationState {
    readonly loading: boolean;
    readonly data: Config;
    readonly error?: string;
}
