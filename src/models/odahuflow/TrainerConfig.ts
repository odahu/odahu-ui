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

export interface TrainerConfig {
    auth?: models.AuthConfig;

    /**
     * ID of the model training
     */
    modelTrainingId?: string;

    /**
     * The path to the configuration file for a user trainer.
     */
    mtFile?: string;

    /**
     * The path to the dir when a user trainer will save their result.
     */
    outputDir?: string;

}
