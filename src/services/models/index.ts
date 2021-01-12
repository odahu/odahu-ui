import {DeployedModel} from "../../models/service-catalog/DeployedModel";
import {extractEntity} from "../index";

// API client for service-catalog app
// github.com/odahu/odahu-flow/packages/operator/cmd/service_catalog
// Provide information about deployed models: swagger spec, ML Server name, Model metadata, etc
export class ModelService {
    protected readonly baseURL: string;

    constructor(baseURL = '') {
        this.baseURL = baseURL
    }

    getInfo(id: string): Promise<DeployedModel> {
        return fetch(`${this.baseURL}/service-catalog/model-info/${id}`,
            {redirect: 'manual'}).then(extractEntity)
    }
}