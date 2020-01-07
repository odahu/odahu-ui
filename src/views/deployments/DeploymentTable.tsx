import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedTable, EnhancedTableProps} from "../../components/table/EnhancedTable";
import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";
import {ModelDeploymentState} from "../../store/deployments/types";
import {deleteDeploymentRequest, fetchAllDeploymentRequest} from "../../store/deployments/actions";
import {DeploymentURLNewPrefix} from "./DeploymentEditablePage";
import {DeploymentURLPagePrefix} from "./DeploymentViewPage";
import {Link as RouterLink} from "react-router-dom";
import {ConnectionPageURLPrefix} from "../connections/ConnectionViewPage";

const DeploymentEnhancedTable = (props: EnhancedTableProps<ModelDeployment>) => <EnhancedTable {...props}/>;

export const DeploymentTable: React.FC = () => {
    const deploymentState = useSelector<ApplicationState, ModelDeploymentState>(state => state.deployments);
    const dispatch = useDispatch();
    const headers = ['Image pull connection ID', 'Image', 'Replicas', 'State'];

    return (
        <DeploymentEnhancedTable
            readonly={false}
            tableTitle="Model Deployments"
            headers={headers}
            data={deploymentState.data}
            length={deploymentState.length}
            onRefreshButtonClick={() => {
                dispatch(fetchAllDeploymentRequest());
            }}
            onDeleteButtonClick={(selectedIDs) => {
                Promise.all(
                    selectedIDs.map(mdID => dispatch(deleteDeploymentRequest(mdID)))
                ).then(() => {
                    dispatch(fetchAllDeploymentRequest())
                });
            }}
            extractRow={md => [
                (
                    <RouterLink key="toolchain" to={`${ConnectionPageURLPrefix}/${md.spec?.imagePullConnID}`}>
                        {md.spec?.imagePullConnID}
                    </RouterLink>
                ),
                md.spec?.image,
                `${md.spec?.minReplicas}/${md.status?.availableReplicas}/${md.spec?.maxReplicas}`,
                md.status?.state
            ]}
            newUrlPrefix={DeploymentURLNewPrefix}
            pageUrlPrefix={DeploymentURLPagePrefix}
        />
    );
};
