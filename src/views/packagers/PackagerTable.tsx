import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedReadonlyTableProps, EnhancedTable} from "../../components/table/EnhancedTable";
import {PackagerURLPagePrefix} from "./PackagerPage";
import {PackagingIntegration} from "../../models/odahuflow/PackagingIntegration";
import {PackagerState} from "../../store/packagers/types";
import {fetchAllPackagerRequest} from "../../store/packagers/actions";

const PackagerEnhancedTable = (props: EnhancedReadonlyTableProps<PackagingIntegration>) => <EnhancedTable {...props}/>;

export const PackagerTable: React.FC = () => {
    const packagerState = useSelector<ApplicationState, PackagerState>(state => state.packagers);
    const dispatch = useDispatch();
    const headers = ['Default Docker Image', 'Entrypoint'];

    return (
        <PackagerEnhancedTable
            readonly={true}
            tableTitle="Packagers"
            headers={headers}
            data={packagerState.data}
            length={packagerState.length}
            onRefreshButtonClick={() => {
                dispatch(fetchAllPackagerRequest());
            }}
            extractRow={packager => [
                packager.spec?.defaultImage,
                packager.spec?.entrypoint,
            ]}
            pageUrlPrefix={PackagerURLPagePrefix}
        />
    );
};
