/**
 * API Gateway
 * This is an API Gateway server.
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface K8sPackager {
    /**
     * Connection where a trained model artifact is stored
     */
    modelHolder?: models.Connection;

    /**
     * Model Packaging
     */
    modelPackaging?: models.ModelPackaging;

    /**
     * Packaging integration
     */
    packagingIntegration?: models.PackagingIntegration;

    /**
     * List of targets with appropriate connections
     */
    targets?: Array<models.PackagerTarget>;

    /**
     * Name of trained model artifact name
     */
    trainingZipName?: string;

}
