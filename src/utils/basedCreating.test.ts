import {createPackagingSpecFromTraining} from "./basedCreating";

test("Output connection in Packaging must be the same as in Training", () => {
    const packagingSpec = createPackagingSpecFromTraining({
        id: "some-id",
        spec: {
            outputConnection: "connection-123"
        }
    })
    expect(packagingSpec.outputConnection).toEqual("connection-123")
})

test("Artifact name must be as the last artifact in training", () => {
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

test("If no runs then artifact name in packaging should be empty", () => {
    const packagingSpec = createPackagingSpecFromTraining({
        id: "some-id",
        status: {
            artifacts: [
            ]
        }
    })
    expect(packagingSpec.artifactName).toEqual("")
})