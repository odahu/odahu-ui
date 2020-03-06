import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedTable, EnhancedTableProps} from "../../components/table/EnhancedTable";
import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";
import {ModelDeploymentState} from "../../store/deployments/types";
import {deleteDeploymentRequest, fetchAllDeploymentRequest} from "../../store/deployments/actions";
import {Link as RouterLink} from "react-router-dom";
import {DeploymentURLs} from "./urls";
import {join} from "path";
import {ConnectionURLs} from "../connections/urls";
import {humanDate} from "../../utils/date";

const DeploymentEnhancedTable = (props: EnhancedTableProps<ModelDeployment>) => <EnhancedTable {...props}/>;

const headers = ['Image pull connection ID', 'Image', 'Replicas', 'State', 'Created at', 'Updated at'];
const extractRow = (md: ModelDeployment) => [
    (
        <RouterLink
            key="toolchain"
            to={join(ConnectionURLs.Page, md.spec?.imagePullConnID ?? '')}
        >
            {md.spec?.imagePullConnID}
        </RouterLink>
    ),
    md.spec?.image,
    `${md.spec?.minReplicas}/${md.status?.availableReplicas}/${md.spec?.maxReplicas}`,
    md.status?.state,
    humanDate(md.status?.createdAt),
    humanDate(md.status?.updatedAt)
];

export const DeploymentTable: React.FC = () => {
    const deploymentState = useSelector<ApplicationState, ModelDeploymentState>(state => state.deployments);
    const dispatch = useDispatch();

    const onDeleteButtonClick = (selectedIDs: string[]) => {
        Promise.all(
            selectedIDs.map(mdID => dispatch(deleteDeploymentRequest(mdID)))
        ).then(() => {
            dispatch(fetchAllDeploymentRequest())
        });
    };

    const onRefreshButtonClick = () => {
        dispatch(fetchAllDeploymentRequest());
    };

    return (
        <DeploymentEnhancedTable
            readonly={false}
            tableTitle="Model Deployments"
            headers={headers}
            data={deploymentState.data}
            length={deploymentState.length}
            onRefreshButtonClick={onRefreshButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
            extractRow={extractRow}
            newUrlPrefix={DeploymentURLs.New}
            pageUrlPrefix={DeploymentURLs.Page}
            cloneUrlPrefix={DeploymentURLs.Clone}
        />
    );
};
