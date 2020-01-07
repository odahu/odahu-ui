import {CommonService} from "../index";
import {ToolchainIntegration} from "../../models/odahuflow/ToolchainIntegration";


export class TrainingToolchainService extends CommonService<ToolchainIntegration> {
    constructor(baseURL = '') {
        super('api/v1/toolchain/integration', baseURL)
    }
}
