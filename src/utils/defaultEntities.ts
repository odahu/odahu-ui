import {ModelPackagingSpec} from "../models/odahuflow/ModelPackagingSpec";
import {merge} from "./enities";

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