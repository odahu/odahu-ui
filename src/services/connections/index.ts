import {CommonService} from "../index";
import {Connection} from "../../models/odahuflow/Connection";


export class ConnectionService extends CommonService<Connection> {
    constructor(baseURL = '') {
        super('api/v1/connection', baseURL)
    }
}
