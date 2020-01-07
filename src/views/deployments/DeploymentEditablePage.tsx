import React from 'react';
import {EditablePage} from "../../components/EditablePage";
import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";
import {createDeploymentRequest, fetchAllDeploymentRequest} from "../../store/deployments/actions";
import * as Yup from "yup";
import {ResourceRequirementsSchema} from "../../models";
import {SaveButtonClick} from "../../components/actions";
import {ConnectionTypes} from "../connections/types";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConnectionState} from "../../store/connections/types";
import {DeploymentView} from "./DeploymentView";
import {DeploymentURLPagePrefix} from "./DeploymentViewPage";
import {FormikOdahuAutocomplete} from "../../components/OdahuAutocomplete";
import {IDSchema} from "../../components/fields";
import {FormikOdahuSelect} from "../../components/OdahuSelect";
import {ModelPackagingState} from "../../store/packaging/types";
import {OdahuTextField} from "../../components/CustomTextField";
import {ResourcesSpecElements} from "../../components/ResourceSpecElements";

export const DeploymentURLNewPrefix = "/deployments/new";

// TODO: refactor
const DeploymentSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        image: Yup.string().nullable().required('Image is a required field'),
        livenessProbeInitialDelay: Yup.number().moreThan(0),
        readinessProbeInitialDelay: Yup.number().moreThan(0),
        minReplicas: Yup.number()
            .test('>=', 'Maximum replicas number must be greater than 0', value => value >= 0),
        maxReplicas: Yup.number()
            .test('>=', 'Maximum replicas number must be greater than 1', value => value >= 1),
        resources: ResourceRequirementsSchema,
    }),
});

const DeploymentMetaSchema = Yup.object().shape({
    id: Yup.string().required(),
    spec: Yup.object().shape({
        imagePullConnID: Yup.string(),
    }),
});

const MetadataElements: React.FC = () => {
    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const dockerConnectionIDs = Object.values(connectionsState.data)
        .filter(conn => conn.spec?.type === ConnectionTypes.DOCKER || conn.spec?.type === ConnectionTypes.ECR)
        .map(conn => conn.id);

    return (
        <>
            <OdahuTextField
                name="id"
                label='ID'
            />
            <FormikOdahuSelect
                label="Image pull connection ID"
                name="spec.imagePullConnID"
                options={dockerConnectionIDs}
            />
        </>
    )
};

const SpecElements: React.FC = () => {
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
            />
            <OdahuTextField
                name="spec.minReplicas"
                label="Minimum replicas"
                type="number"
            />
            <OdahuTextField
                name="spec.maxReplicas"
                label="Maximum replicas"
                type="number"
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

export interface EditableDeploymentPageProps {
    deployment: ModelDeployment;
    saveButtonClick: SaveButtonClick<ModelDeployment>;
}

export const EditableDeploymentPage: React.FC<EditableDeploymentPageProps> = ({deployment, saveButtonClick}) => {
    return (
        <EditablePage
            entity={deployment}
            redirectURL={DeploymentURLPagePrefix}
            title="Edit Deployment"
            schemas={{
                metadata: DeploymentMetaSchema,
                spec: DeploymentSchema,
            }}
            fields={{
                metadata: () => <MetadataElements/>,
                spec: () => <SpecElements/>,
                review: deployment => <DeploymentView deployment={deployment}/>,
            }}
            saveButtonClick={saveButtonClick}
        />
    );
};

export const NewDeploymentPage: React.FC = () => {
    return (
        <EditablePage
            entity={{
                id: '', spec: {
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
                }
            }}
            redirectURL={DeploymentURLPagePrefix}
            title="New Deployment"
            schemas={{
                metadata: DeploymentMetaSchema,
                spec: DeploymentSchema,
            }}
            fields={{
                metadata: () => <MetadataElements/>,
                spec: () => <SpecElements/>,
                review: deployment => <DeploymentView deployment={deployment}/>,
            }}
            saveButtonClick={new SaveButtonClick<ModelDeployment>(
                createDeploymentRequest,
                fetchAllDeploymentRequest,
                "Model Deployment was created",
            )}
        />
    );
};
