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

export interface ModelDeploymentConfig {
    /**
     * Default connection ID which will be used if a user doesn't specify it in a model deployment
     */
    defaultDockerPullConnName?: string;

    edge?: models.EdgeConfig;

    /**
     * Enable deployment API/operator
     */
    enabled?: boolean;

    istio?: models.ModelDeploymentIstioConfig;

    /**
     * Kubernetes namespace, where model deployments will be deployed
     */
    namespace?: string;

    /**
     * Kubernetes node selector for model deployments
     */
    nodeSelector?: { [key: string]: string; };

    security?: models.ModelDeploymentSecurityConfig;

    /**
     * Kubernetes tolerations for model deployments
     */
    toleration?: { [key: string]: string; };

}
