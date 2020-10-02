import {ModelPackagingSpec} from "../models/odahuflow/ModelPackagingSpec";
import {merge} from "./enities";
import {ModelDeploymentSpec} from "../models/odahuflow/ModelDeploymentSpec";

export function defaultPackagingSpec(mps?: ModelPackagingSpec): ModelPackagingSpec {
    return merge({
        artifactName: "",
        integrationName: "",
        outputConnection: "",
        targets: [],
        arguments: [],
        resources: {
            requests: {
                cpu: '',
                gpu: '',
                memory: '',
            },
            limits: {
                cpu: '',
                gpu: '',
                memory: '',
            },
        }
    }, mps ?? {})
}

export function defaultDeploymentSpec(mds?: ModelDeploymentSpec): ModelDeploymentSpec {
    return merge({
        livenessProbeInitialDelay: 10,
        readinessProbeInitialDelay: 10,
        minReplicas: 0,
        maxReplicas: 1,
        resources: {
            requests: {
                cpu: '',
                gpu: '',
                memory: '',
            },
            limits: {
                cpu: '',
                gpu: '',
                memory: '',
            },
        }
    }, mds ?? {})
}