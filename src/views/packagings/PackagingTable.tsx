import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedTable, EnhancedTableProps} from "../../components/table/EnhancedTable";
import {PackagingURLNewPrefix} from "./PackagingEditablePage";
import {PackagingURLPagePrefix} from "./PackagingViewPage";
import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";
import {ModelPackagingState} from "../../store/packaging/types";
import {deletePackagingRequest, fetchAllPackagingRequest} from "../../store/packaging/actions";
import {Link as RouterLink} from "react-router-dom";
import {PackagerURLPagePrefix} from "../packagers/PackagerPage";

const PackagingEnhancedTable = (props: EnhancedTableProps<ModelPackaging>) => <EnhancedTable {...props}/>;

export const PackagingTable: React.FC = () => {
    const packagingState = useSelector<ApplicationState, ModelPackagingState>(state => state.packagings);
    const dispatch = useDispatch();
    const headers = ['Integration', 'Artifact name', 'State'];

    return (
        <PackagingEnhancedTable
            readonly={false}
            tableTitle="Model Packagings"
            headers={headers}
            data={packagingState.data}
            length={packagingState.length}
            onRefreshButtonClick={() => {
                dispatch(fetchAllPackagingRequest());
            }}
            onDeleteButtonClick={(selectedIDs) => {
                Promise.all(
                    selectedIDs.map(mpID => dispatch(deletePackagingRequest(mpID)))
                ).then(() => {
                    dispatch(fetchAllPackagingRequest())
                });
            }}
            extractRow={mt => [
                (
                    <RouterLink key="packager" to={`${PackagerURLPagePrefix}/${mt.spec?.integrationName}`}>
                        {mt.spec?.integrationName}
                    </RouterLink>
                ),
                mt.spec?.artifactName,
                mt.status?.state
            ]}
            newUrlPrefix={PackagingURLNewPrefix}
            pageUrlPrefix={PackagingURLPagePrefix}
        />
    );
};
