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

export interface Vault {
    /**
     * Can be used to debug and local development. Skip TLS verification
     */
    insecure?: boolean;

    /**
     * Vault role for access to the secret engine path
     */
    role?: string;

    /**
     * Vault secret engine path where connection will be stored
     */
    secretEnginePath?: string;

    /**
     * Optionally. Token for access to the vault server If it is empty then client will use the k8s auth
     */
    token?: string;

    /**
     * Vault URL
     */
    url?: string;

}
