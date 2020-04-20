import React from 'react';
import {EditablePage} from "../../components/EditablePage";
import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";
import {
    createDeploymentRequest,
    fetchAllDeploymentRequest,
    fetchDeploymentRequest
} from "../../store/deployments/actions";
import {SaveButtonClick} from "../../components/actions";
import {DeploymentView} from "./DeploymentView";
import {SpecElements} from "./editable/SpecElements";
import {MetadataElements} from "./editable/MetadataElements";
import {DeploymentMetaSchema, DeploymentSchema} from "./editable/schemas";
import {DeploymentURLs} from "./urls";
import {ModelDeploymentSpec} from "../../models/odahuflow/ModelDeploymentSpec";
import {FetchingEntity} from "../../components/EntitiyFetching";
import {addSuffixToID, merge} from "../../utils/enities";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConfigurationState} from "../../store/configuration/types";

const defaultFields = {
    redirectURL: DeploymentURLs.Page,
    schemas: {
        metadata: DeploymentMetaSchema,
        spec: DeploymentSchema,
    },
    fields: {
        metadata: () => <MetadataElements/>,
        spec: () => <SpecElements/>,
        review: (deployment: ModelDeployment) => <DeploymentView deployment={deployment} status={false}/>,
    },
    saveButtonClick: new SaveButtonClick<ModelDeployment>(
        createDeploymentRequest,
        fetchAllDeploymentRequest,
        "Model Deployment was created",
    )
};

function defaultDeploymentSpec(mds?: ModelDeploymentSpec): ModelDeploymentSpec {
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

export interface EditableDeploymentPageProps {
    deployment: ModelDeployment;
    saveButtonClick: SaveButtonClick<ModelDeployment>;
}

export const EditableDeploymentPage: React.FC<EditableDeploymentPageProps> = ({deployment, saveButtonClick}) => {
    return (
        <EditablePage
            {...defaultFields}
            fields={{
                metadata: () => <MetadataElements readonlyID/>,
                spec: () => <SpecElements/>,
                review: (deployment: ModelDeployment) => <DeploymentView deployment={deployment} status={false}/>,
            }}
            title="Edit Deployment"
            entity={deployment}
            saveButtonClick={saveButtonClick}
        />
    );
};

export const NewDeploymentPage: React.FC = () => {
    const config = useSelector<ApplicationState, ConfigurationState>(state => state.configuration);

    return (
        <EditablePage
            {...defaultFields}
            title="New Deployment"
            entity={{
                id: '',
                spec: defaultDeploymentSpec({
                    resources: config.data.deployment?.defaultResources,
                    imagePullConnID: config.data.deployment?.defaultDockerPullConnName,
                })
            }}
        />
    );
};

export const CloneDeploymentPage: React.FC = () => {
    return (
        <FetchingEntity
            fetchAction={fetchDeploymentRequest}
        >
            {
                (deployment: ModelDeployment) => (
                    <EditablePage
                        {...defaultFields}
                        title="Clone Deployment"
                        entity={{
                            id: addSuffixToID(deployment.id as string, '-clone'),
                            spec: Object.assign(defaultDeploymentSpec(), deployment.spec)
                        }}
                    />
                )
            }
        </FetchingEntity>
    );
};
