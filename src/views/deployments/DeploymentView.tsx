import React from 'react';
import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";
import {ParameterView} from "../../components/ParameterView";

export interface DeploymentViewProps {
    deployment: ModelDeployment;
}

export const DeploymentView: React.FC<DeploymentViewProps> = ({deployment}) => {
    return (
        <ParameterView params={[
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
        ]}/>
    )
};
