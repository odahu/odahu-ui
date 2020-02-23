import {CommonService} from "../index";
import {PackagingIntegration} from "../../models/odahuflow/PackagingIntegration";


export class PackagerIntegrationService extends CommonService<PackagingIntegration> {
    constructor(baseURL = '') {
        super('api/v1/packaging/integration', baseURL)
    }
}
