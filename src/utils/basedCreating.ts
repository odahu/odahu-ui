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
import {defaultPackagingSpec} from "./defaultEntities"
import {ModelPackagingSpec} from "../models/odahuflow/ModelPackagingSpec";

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