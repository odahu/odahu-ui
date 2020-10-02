/**
 *
 * This module contains different transformations
 * ModelTraining -> ModelPackaging
 * ModelPackaging -> ModelDeployment
 * etc.
 *
 * The main idea is to speedup creating of next step in typical ML pipeline
 *
 * */
import {ModelTraining} from "../models/odahuflow/ModelTraining";
import {defaultDeploymentSpec, defaultPackagingSpec} from "./defaultEntities"
import {ModelPackagingSpec} from "../models/odahuflow/ModelPackagingSpec";
import {ModelPackaging} from "../models/odahuflow/ModelPackaging";
import {ModelDeploymentSpec} from "../models/odahuflow/ModelDeploymentSpec";

export const createPackagingSpecFromTraining = (mt: ModelTraining): ModelPackagingSpec => {

    let artifactName = ""
    const artifacts = mt.status?.artifacts ?? []
    if (artifacts.length > 0) {
        const lastArtifact = artifacts[artifacts.length - 1]
        artifactName = lastArtifact.artifactName ?? ""
    }

    return defaultPackagingSpec({
        outputConnection: mt.spec?.outputConnection,
        artifactName: artifactName
    })
}

export const createDeploymentSpecFromPackaging = (mp: ModelPackaging): ModelDeploymentSpec => {

    // there is not strict way
    const imageKey = "image"
    const dockerRepoKey = "docker-push"

    let image = ""
    const results = mp.status?.results ?? []
    if (results.length > 0) {
        const lastResult = results[results.length - 1]
        if (lastResult.name === imageKey) {
            image = lastResult.value ?? ""
        }
    }

    let imagePullConnectionID = ""
    const pushTargets = (mp.spec?.targets ?? [])
        .filter(v => v.name === dockerRepoKey)
        .map(v => v.connectionName ?? "")

    if (pushTargets.length === 1) {
        imagePullConnectionID = pushTargets[0]
    }

    return defaultDeploymentSpec({
        image: image,
        imagePullConnID: imagePullConnectionID
    })
}