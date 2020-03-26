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

export interface ModelTrainingConfig {
    /**
     * Enable deployment API/operator
     */
    enabled?: boolean;

    gpuNodeSelector?: { [key: string]: string; };

    /**
     * Kubernetes tolerations for GPU model trainings pods
     */
    gpuToleration?: { [key: string]: string; };

    metricUrl?: string;

    modelTrainerImage?: string;

    /**
     * Kubernetes namespace, where model trainings will be deployed
     */
    namespace?: string;

    nodeSelector?: { [key: string]: string; };

    outputConnectionID?: string;

    serviceAccount?: string;

    /**
     * Timeout for full training process
     */
    timeout?: string;

    /**
     * Kubernetes tolerations for model trainings pods
     */
    toleration?: { [key: string]: string; };

    toolchainIntegrationNamespace?: string;

}
