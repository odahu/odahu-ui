import {Configuration} from "../../models/odahuflow/Configuration";
import {extractEntity} from "../index";

export class ConfigurationService {

    private readonly baseURL: string;

    constructor(baseURL = '') {
        this.baseURL = baseURL;
    }

    get(): Promise<Configuration> {
        return fetch(`${this.baseURL}/api/v1/configuration`).then(extractEntity);
    }

}
