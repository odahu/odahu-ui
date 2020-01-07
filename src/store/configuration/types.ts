import {Configuration} from "../../models/odahuflow/Configuration";


export interface ConfigurationState {
    readonly loading: boolean;
    readonly data: Configuration;
    readonly error?: string;
}
