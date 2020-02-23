import {Configuration} from "../../models/odahuflow/Configuration";

export class ConfigurationService {

    private readonly baseURL: string;

    constructor(baseURL = '') {
        this.baseURL = baseURL;
    }

    get(): Promise<Configuration> {
        return fetch(`${this.baseURL}/api/v1/configuration`).then(
            res => {
                return res.json();
            }
        );
    }

}
