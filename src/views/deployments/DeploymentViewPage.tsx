import React from 'react';
import {useParams} from "react-router-dom";

import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {Editor} from "../../components/Editor";
import {ViewPage} from "../../components/ViewPage";
import {SaveButtonClick} from "../../components/actions";
import {ModelDeploymentState} from "../../store/deployments/types";
import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";
import {editDeploymentRequest, fetchAllDeploymentRequest} from "../../store/deployments/actions";
import {DeploymentView} from "./DeploymentView";
import {EditableDeploymentPage} from "./DeploymentPages";

export const DeploymentViewPage: React.FC = () => {
    // Parameter from URL
    const {id} = useParams();

    // Global state
    const deploymentState = useSelector<ApplicationState, ModelDeploymentState>(state => state.deployments);
    // We keep all entities in global state. In the future, we should make http request if entity missed
    const deployment = deploymentState.data[String(id)];

    const saveButtonClick = new SaveButtonClick<ModelDeployment>(
        editDeploymentRequest,
        fetchAllDeploymentRequest,
        "Model Deployment was saved",
    );

    return (
        <ViewPage
            loading={deploymentState.loading}
            notFound={!deployment}
            tabHeaders={["View", "Edit", "YAML"]}
            tabValues={[
                <DeploymentView
                    key="view"
                    deployment={deployment}
                />,
                <EditableDeploymentPage
                    key="page"
                    deployment={deployment}
                    saveButtonClick={saveButtonClick}
                />,
                <Editor
                    key="yaml"
                    readonly={false}
                    entity={deployment}
                    fileName={`${id}.deployment.odahuflow.yaml`}
                    saveButtonClick={saveButtonClick}
                />
            ]}
        />
    )
};
