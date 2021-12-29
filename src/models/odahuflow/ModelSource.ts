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

export interface ModelSource {
    /**
     * Local does not fetch model and assume that model is embedded into container
     */
    local?: models.LocalModelSource;

    /**
     * Remote fetch model from remote model registry using ODAHU connections mechanism
     */
    remote?: models.RemoteModelSource;

}
