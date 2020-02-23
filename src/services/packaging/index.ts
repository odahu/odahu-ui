import {CommonLoggingService} from "../index";
import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";


export class PackagingService extends CommonLoggingService<ModelPackaging> {
    constructor(baseURL = '') {
        super('api/v1/model/packaging', baseURL)
    }
}
