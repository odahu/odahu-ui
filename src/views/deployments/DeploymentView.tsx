import React from 'react';
import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";
import {ParametersView, ViewParam} from "../../components/ParametersView";
import {humanDate} from "../../utils/date";

export interface DeploymentViewProps {
    deployment: ModelDeployment;
    status: boolean;
}

export const DeploymentView: React.FC<DeploymentViewProps> = ({deployment, status}) => {
    const parameters: Array<ViewParam> = [
        {name: "ID", elem: deployment.id},
        {name: "Created at", elem: humanDate(deployment.createdAt)},
        {name: "Updated at", elem: humanDate(deployment.updatedAt)},
    ];

    if (status) {
        parameters.push(
            {name: "State", elem: deployment.status?.state},
        )
    }

    parameters.push(
        {name: "Docker image", elem: deployment.spec?.image},
        {name: "Image pull connection ID", elem: deployment.spec?.imagePullConnID},
        {name: "Minimum replicas", elem: deployment.spec?.minReplicas},
        {name: "Maximum replicas", elem: deployment.spec?.maxReplicas},
        {name: "Role", elem: deployment.spec?.roleName},
        {name: "Memory requests", elem: deployment.spec?.resources?.requests?.memory},
        {name: "Memory limits", elem: deployment.spec?.resources?.limits?.memory},
        {name: "CPU requests", elem: deployment.spec?.resources?.requests?.cpu},
        {name: "CPU limits", elem: deployment.spec?.resources?.limits?.cpu},
        {name: "Liveness probe initial delay", elem: deployment.spec?.livenessProbeInitialDelay},
        {name: "Readiness probe initial delay", elem: deployment.spec?.readinessProbeInitialDelay},
    );

    if (status) {
        parameters.push(
            {name: "Model URL", elem: deployment.status?.serviceURL},
            {name: "Available replicas", elem: deployment.status?.availableReplicas},
        )
    }

    return <ParametersView params={parameters}/>
};
