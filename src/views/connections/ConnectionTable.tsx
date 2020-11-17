import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {ConnectionState} from "../../store/connections/types";
import {deleteConnectionRequest, fetchAllConnectionRequest} from "../../store/connections/actions";
import {EnhancedTable, EnhancedTableProps} from "../../components/table/EnhancedTable";
import {Connection} from "../../models/odahuflow/Connection";
import {ExternalLink} from "../../components/ExternalLink";
import {ConnectionURLs} from "./urls";
import {humanDate} from "../../utils/date";

const ConnectionEnhancedTable = (props: EnhancedTableProps<Connection>) => <EnhancedTable {...props}/>;

const connectionHeaders = ['Type', 'URI', 'Description', 'WEB UI', 'Created at', 'Updated at'];
const extractRow = (conn: Connection) => [
    conn.spec?.type,
    conn.spec?.uri,
    conn.spec?.description,
    <ExternalLink key="webUILink" url={conn.spec?.webUILink}/>,
    humanDate(conn.status?.createdAt),
    humanDate(conn.status?.updatedAt),
];
const extractRowValues = (conn: Connection) => [
    conn.spec?.type ?? "",
    conn.spec?.uri ?? "",
    conn.spec?.description ?? "",
    conn.spec?.webUILink ?? "",
    humanDate(conn.status?.createdAt),
    humanDate(conn.status?.updatedAt),
];

export const ConnectionTable: React.FC = () => {
    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const dispatch = useDispatch();

    const onDeleteButtonClick = (selectedIDs: string[]) => {
        Promise.all(
            selectedIDs.map(connID => dispatch(deleteConnectionRequest(connID)))
        ).then(() => {
            dispatch(fetchAllConnectionRequest())
        });
    };

    const onRefreshButtonClick = () => {
        dispatch(fetchAllConnectionRequest());
    };

    return (
        <ConnectionEnhancedTable
            readonly={false}
            tableTitle="Connections"
            headers={connectionHeaders}
            data={connectionsState.data}
            length={connectionsState.length}
            onRefreshButtonClick={onRefreshButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
            extractRow={extractRow}
            extractRowValues={extractRowValues}
            newUrlPrefix={ConnectionURLs.New}
            pageUrlPrefix={ConnectionURLs.Page}
            cloneUrlPrefix={ConnectionURLs.Clone}
        />
    );
};
