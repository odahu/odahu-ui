import React from "react";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {ModelPackagingState} from "../../../store/packaging/types";
import {FormikOdahuAutocomplete} from "../../../components/OdahuAutocomplete";
import {OdahuTextField} from "../../../components/CustomTextField";
import {ResourcesSpecElements} from "../../../components/ResourceSpecElements";

export const SpecElements: React.FC = () => {
    const packagerState = useSelector<ApplicationState, ModelPackagingState>(state => state.packagings);
    const packagingImages = Object.values(packagerState.data)
        // TODO: fix the hardcoded intergration name
        .filter(mp => mp.spec?.integrationName === "docker-rest")
        .filter(mp => mp.status?.state === "succeeded")
        .filter(mp => mp.status?.results)
        .flatMap(mp => mp.status?.results)
        .map(result => result?.value);

    return (
        <>
            <FormikOdahuAutocomplete
                name="spec.image"
                label="Docker image"
                options={packagingImages}
                description='Model Docker image'
            />
            <OdahuTextField
                name="spec.minReplicas"
                label="Minimum replicas"
                type="number"
                description='Minimum number of replicas'
            />
            <OdahuTextField
                name="spec.maxReplicas"
                label="Maximum replicas"
                type="number"
                description='Maximum number of replicas'
            />
            <OdahuTextField
                name="spec.livenessProbeInitialDelay"
                label="Liveness probe initial delay"
                type="number"
            />
            <OdahuTextField
                name="spec.readinessProbeInitialDelay"
                label="Readiness probe initial delay"
                type="number"
            />
            <ResourcesSpecElements gpu={false}/>
        </>
    )
};
