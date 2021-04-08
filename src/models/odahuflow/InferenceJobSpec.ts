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

export interface InferenceJobSpec {
    /**
     * DataSource defines location input data files. Input data files must have .json extension and be valid JSON files that follows [Predict Protocol - Version 2](https://github.com/kubeflow/kfserving/blob/v0.5.1/docs/predict-api/v2/required_api.md#inference-request-json-object) If nil then will be filled from BatchInferenceService.
     */
    dataSource?: models.ConnectionReference;

    /**
     * InferenceServiceID refers to BatchInferenceService
     */
    inferenceServiceId?: string;

    /**
     * Node selector for specifying a node pool
     */
    nodeSelector?: { [key: string]: string; };

    /**
     * OutputDestination defines location of directory with output files. Output data files must have .json extension and be valid JSON files that follows [Predict Protocol - Version 2](https://github.com/kubeflow/kfserving/blob/v0.5.1/docs/predict-api/v2/required_api.md#inference-response-json-object) If nil then will be filled from BatchInferenceService.
     */
    outputDestination?: models.ConnectionReference;

    /**
     * BatchRequestID is unique identifier for InferenceJob that helps to correlate between Model input, model output and feedback Take into account that it is not the same as kubeflow InferenceRequest id Each InferenceJob can process more than one InferenceRequest (delivered in separate input file) So each BatchRequestID has set of corresponding InferenceRequest and their IDs
     */
    requestId?: string;

    /**
     * Resources for model container The same format like k8s uses for pod resources.
     */
    resources?: models.ResourceRequirements;

}