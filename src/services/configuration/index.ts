import {Config} from "../../models/odahuflow/Config";
import {extractEntity} from "../index";

export class ConfigurationService {

    private readonly baseURL: string;

    constructor(baseURL = '') {
        this.baseURL = baseURL;
    }

    get(): Promise<Config> {
        return fetch(
            `${this.baseURL}/api/v1/configuration`,
            {redirect: 'manual'}
        ).then(extractEntity);
    }

}
