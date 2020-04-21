import {extractEntity} from "../index";
import {UserInfo} from "../../models/odahuflow/UserInfo";

export class UserService {

    private readonly baseURL: string;

    constructor(baseURL = '') {
        this.baseURL = baseURL;
    }

    get(): Promise<UserInfo> {
        return fetch(
            `${this.baseURL}/api/v1/user/info`,
            {redirect: 'manual'}
        ).then(extractEntity);
    }

}
