import {Connection} from "../models/odahuflow/Connection";
import {ConfigurationService} from "./configuration";
import {ModelDeployment} from "../models/odahuflow/ModelDeployment";
import {ModelPackaging} from "../models/odahuflow/ModelPackaging";
import {PackagingIntegration} from "../models/odahuflow/PackagingIntegration";
import {ModelTraining} from "../models/odahuflow/ModelTraining";
import {ToolchainIntegration} from "../models/odahuflow/ToolchainIntegration";

interface ErrorMessage {
    message: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isErrorMessage<T>(resp: Response, entity: T | ErrorMessage): entity is ErrorMessage {
    return !resp.ok
}

// TODO: fix type
export function extractEntity(resp: Response): Promise<any> {
    if (resp.status >= 500) {
        return resp.text().then(errorMessage => {
            throw new Error(errorMessage);
        })
    }

    return resp.json().then(entity => {
        if (isErrorMessage(resp, entity)) {
            throw new Error(entity.message);
        }

        return entity;
    })
}

export function extractText(resp: Response): Promise<string> {
    return resp.text().then(entity => {
        if (isErrorMessage(resp, entity)) {
            throw new Error(entity.message);
        }

        return entity;
    })
}

export interface Service<T, K = string> {
    get(id: K): Promise<T>;

    getAll(): Promise<T[]>;

    create(entity: T): Promise<T>;

    edit(entity: T): Promise<T>;

    delete(id: K): Promise<void>;
}

export interface LoggingService<T, K = string> extends Service<T, K> {
    logs(id: K): Promise<string>;
}

export class CommonService<T> implements Service<T, string> {
    protected readonly baseURL: string;
    protected readonly apiURL: string;

    constructor(apiURL: string, baseURL = '') {
        this.apiURL = apiURL;
        this.baseURL = baseURL;
    }

    create(entity: T): Promise<T> {
        return fetch(`${this.baseURL}/${this.apiURL}`, {
            method: 'POST',
            body: JSON.stringify(entity),
        }).then(extractEntity);
    }

    delete(id: string): Promise<void> {
        return fetch(`${this.baseURL}/${this.apiURL}/${id}`, {
            method: 'DELETE',
        }).then(extractEntity);
    }

    edit(entity: T): Promise<T> {
        return fetch(`${this.baseURL}/${this.apiURL}`, {
            method: 'PUT',
            body: JSON.stringify(entity),
        }).then(extractEntity);
    }

    get(id: string): Promise<T> {
        return fetch(`${this.baseURL}/${this.apiURL}/${id}`).then(extractEntity);
    }

    getAll(): Promise<T[]> {
        return fetch(`${this.baseURL}/${this.apiURL}`).then(extractEntity);
    }

}

export class CommonLoggingService<T> extends CommonService<T> implements LoggingService<T, string> {
    logs(id: string): Promise<string> {
        return fetch(`${this.baseURL}/${this.apiURL}/${id}/log`).then(extractText);
    }
}

export interface Services {
    connectionService: Service<Connection>;
    deploymentService: Service<ModelDeployment>;
    configurationService: ConfigurationService;
    packagingService: LoggingService<ModelPackaging>;
    packagerService: Service<PackagingIntegration>;
    trainingService: LoggingService<ModelTraining>;
    toolchainService: Service<ToolchainIntegration>;
}
