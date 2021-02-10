import React from "react";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {ModelPackagingState} from "../../../store/packaging/types";
import {FormikOdahuAutocomplete} from "../../../components/OdahuAutocomplete";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {ResourcesSpecElements} from "../../../components/ResourceSpecElements";
import {useFieldsStyles} from "../../../components/fields";
import {FormikOdahuSelect} from "../../../components/OdahuSelect";
import {predictors, predictorOdahu} from "../../../utils/enums"


export const SpecElements: React.FC = () => {
    const classes = useFieldsStyles();

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
            <FormikOdahuSelect
                className={classes.editorField}
                label="Predictor"
                name="spec.predictor"
                options={predictors}
                description="Predictor set ML Server that will serve model as a web service"
            />
            <FormikOdahuAutocomplete
                className={classes.editorField}
                name="spec.image"
                label="Docker image"
                options={packagingImages}
                description='Model Docker image'
            />
            <OdahuTextField
                className={classes.editorField}
                name="spec.minReplicas"
                label="Minimum replicas"
                type="number"
                description='Minimum number of replicas'
            />
            <OdahuTextField
                className={classes.editorField}
                name="spec.maxReplicas"
                label="Maximum replicas"
                type="number"
                description='Maximum number of replicas'
            />
            <OdahuTextField
                className={classes.editorField}
                name="spec.roleName"
                label="Role"
                description="Optional role to access model"
            />
            <OdahuTextField
                className={classes.editorField}
                name="spec.livenessProbeInitialDelay"
                label="Liveness probe initial delay"
                type="number"
            />
            <OdahuTextField
                className={classes.editorField}
                name="spec.readinessProbeInitialDelay"
                label="Readiness probe initial delay"
                type="number"
            />
            <ResourcesSpecElements gpu={false}/>
        </>
    )
};
