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

export interface ModelDeploymentStatus {
    /**
     * Number of available pods
     */
    availableReplicas?: number;

    /**
     * The model k8s deployment name
     */
    deployment?: string;

    /**
     * Host header value is a routing key for Istio Ingress to forward a request to appropriate Knative Service
     */
    hostHeader?: string;

    /**
     * Time when credentials was updated
     */
    lastUpdatedTime?: string;

    /**
     * Model name discovered in ModelDeployment
     */
    modelName?: string;

    /**
     * Model version discovered in ModelDeployment
     */
    modelVersion?: string;

    /**
     * Expected number of pods under current load
     */
    replicas?: number;

    /**
     * The state of a model    \"Processing\" - A model was not deployed. Because some parameters of the                  custom resource are wrong. For example, there is not a model                  image in a Docker registry.   \"Ready\" - A model was deployed successfully.
     */
    state?: string;

}
