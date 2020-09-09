/**
 * API Gateway
 * This is an API Gateway webServer.
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface OperatorConfig {
    auth?: models.AuthConfig;

    /**
     * Operator HTTP monitoring port
     */
    monitoringPort?: number;

}
