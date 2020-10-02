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
import {ModelDeploymentSpec} from "../../models/odahuflow/ModelDeploymentSpec";
import {FetchingEntity} from "../../components/EntitiyFetching";
import {addSuffixToID, merge} from "../../utils/enities";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {
    ConfigurationState,
    defaultDeploymentImagePullConnSelector,
    defaultDeploymentResourcesSelector
} from "../../store/configuration/types";
import { useHistory } from 'react-router-dom';
import {DeploymentURLs} from "./urls";
import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";
import {fetchPackagerRequest} from "../../store/packagers/actions";
import {createDeploymentSpecFromPackaging} from "../../utils/basedCreating";
import {fetchPackagingRequest} from "../../store/packaging/actions";

const defaultFields = {
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
    const defaultResources = useSelector(defaultDeploymentResourcesSelector);
    const defaultDockerPullConnName = useSelector(defaultDeploymentImagePullConnSelector);

    const history = useHistory()
    const btn = new SaveButtonClick<ModelDeployment>(
        createDeploymentRequest, fetchAllDeploymentRequest, "Model Deployment was created",
        (entity) => {
            const redirectTo = `${DeploymentURLs.Page}/${entity.id}`
            history.push(redirectTo)
        }
    )

    return (
        <EditablePage
            {...defaultFields}
            saveButtonClick={btn}
            title="New Deployment"
            entity={{
                id: '',
                spec: defaultDeploymentSpec({
                    resources: defaultResources,
                    imagePullConnID: defaultDockerPullConnName,
                })
            }}
        />
    );
};

export const CloneDeploymentPage: React.FC = () => {

    const history = useHistory()
    const btn = new SaveButtonClick<ModelDeployment>(
        createDeploymentRequest, fetchAllDeploymentRequest, "Model Deployment was created",
        (entity) => {
            const redirectTo = `${DeploymentURLs.Page}/${entity.id}`
            history.push(redirectTo)
        }
    )

    return (
        <FetchingEntity
            fetchAction={fetchDeploymentRequest}
        >
            {
                (deployment: ModelDeployment) => (
                    <EditablePage
                        {...defaultFields}
                        saveButtonClick={btn}
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

export const CreateFromPackagingPage: React.FC = () => {

    const defaultResources = useSelector(defaultDeploymentResourcesSelector);
    const defaultDockerPullConnName = useSelector(defaultDeploymentImagePullConnSelector);

    const history = useHistory()
    const btn = new SaveButtonClick<ModelDeployment>(
        createDeploymentRequest, fetchAllDeploymentRequest, "Model Deployment was created from packaging",
        (entity) => {
            const redirectTo = `${DeploymentURLs.Page}/${entity.id}`
            history.push(redirectTo)
        }
    )

    return (
        <FetchingEntity
            fetchAction={fetchPackagingRequest}
        >
            {
                (packaging: ModelPackaging) => {
                    const deployment = createDeploymentSpecFromPackaging(packaging)
                    return <EditablePage
                        {...defaultFields}
                        saveButtonClick={btn}
                        title="Create from Packaging"
                        entity={{
                            id: `${packaging.id}-deploy`,
                            spec: {
                                ...deployment,
                                resources: defaultResources,
                                imagePullConnID: deployment.imagePullConnID ?? defaultDockerPullConnName,
                            }
                        } as ModelDeployment}
                    />
                }
            }
        </FetchingEntity>
    );
};