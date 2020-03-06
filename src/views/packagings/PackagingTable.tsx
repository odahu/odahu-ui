import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedTable, EnhancedTableProps} from "../../components/table/EnhancedTable";
import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";
import {ModelPackagingState} from "../../store/packaging/types";
import {deletePackagingRequest, fetchAllPackagingRequest} from "../../store/packaging/actions";
import {Link as RouterLink} from "react-router-dom";
import {join} from "path";
import {PackagerURLs} from "../packagers/urls";
import {PackagingURLs} from "./urls";
import {humanDate} from "../../utils/date";

const PackagingEnhancedTable = (props: EnhancedTableProps<ModelPackaging>) => <EnhancedTable {...props}/>;

const headers = ['Integration', 'Artifact name', 'State', 'Created at', 'Updated at'];
const extractRow = (packaging: ModelPackaging) => [
    (
        <RouterLink
            key="packager"
            to={join(PackagerURLs.Page, packaging.spec?.integrationName ?? '')}
        >
            {packaging.spec?.integrationName}
        </RouterLink>
    ),
    packaging.spec?.artifactName,
    packaging.status?.state,
    humanDate(packaging.status?.createdAt),
    humanDate(packaging.status?.updatedAt)
];

export const PackagingTable: React.FC = () => {
    const packagingState = useSelector<ApplicationState, ModelPackagingState>(state => state.packagings);
    const dispatch = useDispatch();

    const onDeleteButtonClick = (selectedIDs: string[]) => {
        Promise.all(
            selectedIDs.map(mpID => dispatch(deletePackagingRequest(mpID)))
        ).then(() => {
            dispatch(fetchAllPackagingRequest())
        });
    };

    const onRefreshButtonClick = () => {
        dispatch(fetchAllPackagingRequest());
    };

    return (
        <PackagingEnhancedTable
            readonly={false}
            tableTitle="Model Packagings"
            headers={headers}
            data={packagingState.data}
            length={packagingState.length}
            onRefreshButtonClick={onRefreshButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
            extractRow={extractRow}
            newUrlPrefix={PackagingURLs.New}
            pageUrlPrefix={PackagingURLs.Page}
            cloneUrlPrefix={PackagingURLs.Clone}
        />
    );
};
