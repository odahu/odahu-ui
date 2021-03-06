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

export interface InferenceJob {
    /**
     * CreatedAt describes when InferenceJob was launched (readonly)
     */
    createdAt?: string;

    /**
     * Resource ID
     */
    id?: string;

    /**
     * Spec describes parameters of InferenceJob
     */
    spec?: models.InferenceJobSpec;

    /**
     * Spec describes execution status of InferenceJob (readonly)
     */
    status?: models.InferenceJobStatus;

    /**
     * UpdatedAt describes when InferenceJob was updated (readonly)
     */
    updatedAt?: string;

}
