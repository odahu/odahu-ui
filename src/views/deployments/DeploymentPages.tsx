import React from 'react';
import {EditablePage} from "../../components/EditablePage";
import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";
import {createDeploymentRequest, fetchAllDeploymentRequest} from "../../store/deployments/actions";
import {SaveButtonClick} from "../../components/actions";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {DeploymentView} from "./DeploymentView";
import {useParams} from "react-router-dom";
import {SpecElements} from "./editable/SpecElements";
import {MetadataElements} from "./editable/MetadataElements";
import {DeploymentMetaSchema, DeploymentSchema} from "./editable/schemas";
import {DeploymentURLs} from "./urls";
import {ModelDeploymentSpec} from "../../models/odahuflow/ModelDeploymentSpec";
import {ModelDeploymentState} from "../../store/deployments/types";

const defaultFields = {
    redirectURL: DeploymentURLs.Page,
    schemas: {
        metadata: DeploymentMetaSchema,
        spec: DeploymentSchema,
    },
    fields: {
        metadata: () => <MetadataElements/>,
        spec: () => <SpecElements/>,
        review: (deployment: ModelDeployment) => <DeploymentView deployment={deployment}/>,
    },
    saveButtonClick: new SaveButtonClick<ModelDeployment>(
        createDeploymentRequest,
        fetchAllDeploymentRequest,
        "Model Deployment was created",
    )
};

function defaultDeploymentSpec(): ModelDeploymentSpec {
    return {
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
}

export interface EditableDeploymentPageProps {
    deployment: ModelDeployment;
    saveButtonClick: SaveButtonClick<ModelDeployment>;
}

export const EditableDeploymentPage: React.FC<EditableDeploymentPageProps> = ({deployment, saveButtonClick}) => {
    return (
        <EditablePage
            {...defaultFields}
            title="Edit Deployment"
            entity={deployment}
            saveButtonClick={saveButtonClick}
        />
    );
};

export const NewDeploymentPage: React.FC = () => {
    return (
        <EditablePage
            {...defaultFields}
            title="New Deployment"
            entity={{
                id: '',
                spec: defaultDeploymentSpec()
            }}
        />
    );
};

export const CloneDeploymentPage: React.FC = () => {
    const {id} = useParams();

    const deploymentState = useSelector<ApplicationState, ModelDeploymentState>(state => state.deployments);
    const deployment = deploymentState.data[String(id)];

    return (
        <EditablePage
            {...defaultFields}
            title="Clone Deployment"
            entity={{
                id: '',
                spec: Object.assign(defaultDeploymentSpec(), deployment.spec)
            }}
        />
    );
};
