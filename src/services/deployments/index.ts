import {CommonService} from "../index";
import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";


export class DeploymentService extends CommonService<ModelDeployment> {
    constructor(baseURL = '') {
        super('api/v1/model/deployment', baseURL)
    }
}
