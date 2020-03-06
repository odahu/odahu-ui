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
        {name: "Docker image", elem: deployment.spec?.image},
        {name: "Image pull connection ID", elem: deployment.spec?.imagePullConnID},
        {name: "Minimum replicas", elem: deployment.spec?.minReplicas},
        {name: "Maximum replicas", elem: deployment.spec?.maxReplicas},
        {name: "Available replicas", elem: deployment.status?.availableReplicas},
        {name: "Liveness probe initial delay", elem: deployment.spec?.livenessProbeInitialDelay},
        {name: "Readiness probe initial delay", elem: deployment.spec?.readinessProbeInitialDelay},
        {name: "State", elem: deployment.status?.state},
        {name: "Model URL", elem: deployment.status?.serviceURL},
    ];

    if (status){
        parameters.push(
            {name: "Created at", elem: humanDate(deployment.status?.createdAt)},
            {name: "Updated at", elem: humanDate(deployment.status?.updatedAt)},
        )
    }

    return (<ParametersView params={parameters}/>)
};
