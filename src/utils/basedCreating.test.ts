import {createDeploymentSpecFromPackaging, createPackagingSpecFromTraining} from "./basedCreating";

test("Output connection in Packaging must be the same as in Training", () => {
    const packagingSpec = createPackagingSpecFromTraining({
        id: "some-id",
        spec: {
            outputConnection: "connection-123"
        }
    })
    expect(packagingSpec.outputConnection).toEqual("connection-123")
})

test("Artifact name in Packaging must be equal to the last artifact in training", () => {
    const packagingSpec = createPackagingSpecFromTraining({
        id: "some-id",
        status: {
            artifacts: [
                {artifactName: "first-run-artifact"},
                {artifactName: "last-run-artifact"},
            ]
        }
    })
    expect(packagingSpec.artifactName).toEqual("last-run-artifact")
})

test("If there are no training artifacts then artifact name in packaging should be empty", () => {
    const packagingSpec = createPackagingSpecFromTraining({
        id: "some-id",
        status: {
            artifacts: [
            ]
        }
    })
    expect(packagingSpec.artifactName).toEqual("")
})

test("Image in Deployment must be equal to last image in packaging", () => {
    const deploymentSpec = createDeploymentSpecFromPackaging({
        id: "some-id",
        status: {
            results: [
                {name: "not-image", value: "some-value"},
                {name: "image", value: "not-last-image"},
                {name: "image", value: "last-image"},
            ]
        }
    })
    expect(deploymentSpec.image).toEqual("last-image")
})

test("If there is only one docker-push target in packaging then it must be copied to deployment", () => {
    const deploymentSpec = createDeploymentSpecFromPackaging({
        id: "some-id",
        spec: {
            targets: [
                {name: "docker-pull", connectionName: "conn-1"},
                {name: "docker-hack", connectionName: "conn-2"},
                {name: "docker-push", connectionName: "conn-3"},
            ]
        }
    })
    expect(deploymentSpec.imagePullConnID).toEqual("conn-3")
})

test("If there is more than one docker-push target in packaging then we don't copy it to deployment", () => {
    const deploymentSpec = createDeploymentSpecFromPackaging({
        id: "some-id",
        spec: {
            targets: [
                {name: "docker-pull", connectionName: "conn-1"},
                {name: "docker-push", connectionName: "conn-2"},
                {name: "docker-push", connectionName: "conn-3"},
            ]
        }
    })
    expect(deploymentSpec.imagePullConnID).toEqual("")
})