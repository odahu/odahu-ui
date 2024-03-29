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

export interface RemoteModelSource {
    /**
     * ModelConnection is name of connection to object storage bucket where ML model files are expected
     */
    modelConnection?: string;

    /**
     * ModelPath is a directory inside ModelConnection where ML model files are located
     */
    modelPath?: string;

}
