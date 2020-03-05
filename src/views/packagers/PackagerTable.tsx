import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedReadonlyTableProps, EnhancedTable} from "../../components/table/EnhancedTable";
import {PackagingIntegration} from "../../models/odahuflow/PackagingIntegration";
import {PackagerState} from "../../store/packagers/types";
import {fetchAllPackagerRequest} from "../../store/packagers/actions";
import {PackagerURLs} from "./urls";
import {humanDate} from "../../utils/date";

const PackagerEnhancedTable = (props: EnhancedReadonlyTableProps<PackagingIntegration>) => <EnhancedTable {...props}/>;

const headers = ['Default Docker Image', 'Entrypoint', 'Created at', 'Updated at'];
const extractRow = (packager: PackagingIntegration) => [
    packager.spec?.defaultImage,
    packager.spec?.entrypoint,
    humanDate(packager.status?.createdAt),
    humanDate(packager.status?.updatedAt),
];

export const PackagerTable: React.FC = () => {
    const packagerState = useSelector<ApplicationState, PackagerState>(state => state.packagers);
    const dispatch = useDispatch();

    const onRefreshButtonClick = () => {
        dispatch(fetchAllPackagerRequest());
    };

    return (
        <PackagerEnhancedTable
            readonly={true}
            tableTitle="Packagers"
            headers={headers}
            data={packagerState.data}
            length={packagerState.length}
            onRefreshButtonClick={onRefreshButtonClick}
            extractRow={extractRow}
            pageUrlPrefix={PackagerURLs.Page}
        />
    );
};
