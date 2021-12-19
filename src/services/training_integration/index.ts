import {CommonService} from "../index";
import {TrainingIntegration} from "../../models/odahuflow/TrainingIntegration";


export class TrainingIntegrationService extends CommonService<TrainingIntegration> {
    constructor(baseURL = '') {
        super('api/v1/training-integration', baseURL)
    }
}
