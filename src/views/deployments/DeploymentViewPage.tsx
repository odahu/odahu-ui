import React from 'react';
import {useParams} from "react-router-dom";
import {Editor} from "../../components/Editor";
import {ViewPage} from "../../components/ViewPage";
import {SaveButtonClick} from "../../components/actions";
import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";
import {
    editDeploymentRequest,
    fetchAllDeploymentRequest,
    fetchDeploymentRequest
} from "../../store/deployments/actions";
import {DeploymentView} from "./DeploymentView";
import {EditableDeploymentPage} from "./DeploymentPages";
import {useFetchingEntity} from "../../components/EntitiyFetching";
import {GrafanaDashboard} from "../../components/Dashboard";

const saveButtonClick = new SaveButtonClick<ModelDeployment>(
    editDeploymentRequest,
    fetchAllDeploymentRequest,
    "Model Deployment submitted",
);

export const DeploymentViewPage: React.FC = () => {
    const {id} = useParams();

    const {entity, loading, notFound} = useFetchingEntity(id as string, fetchDeploymentRequest);

    return (
        <ViewPage
            loading={loading}
            notFound={notFound}
            tabHeaders={["View", "Edit", "YAML", "Dashboard"]}
            tabValues={[
                <DeploymentView
                    key="view"
                    deployment={entity}
                    status={true}
                />,
                <EditableDeploymentPage
                    key="page"
                    deployment={entity}
                    saveButtonClick={saveButtonClick}
                />,
                <Editor
                    key="yaml"
                    readonly={false}
                    entity={entity}
                    fileName={`${id}.deployment.odahuflow.yaml`}
                    saveButtonClick={saveButtonClick}
                />,
                <GrafanaDashboard
                    key="grafana"
                    deployment
                />
            ]}
        />
    )
};
