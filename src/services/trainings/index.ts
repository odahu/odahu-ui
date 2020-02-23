import {CommonLoggingService} from "../index";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";


export class TrainingService extends CommonLoggingService<ModelTraining> {
    constructor(baseURL = '') {
        super('api/v1/model/training', baseURL)
    }
}
