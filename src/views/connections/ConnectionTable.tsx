import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from "@material-ui/core";
import {ConnectionPageURLPrefix} from "./ConnectionViewPage";
import {ApplicationState} from "../../store";
import {ConnectionState} from "../../store/connections/types";
import {
    deleteConnectionRequest,
    fetchAllConnectionRequest
} from "../../store/connections/actions";
import {EnhancedTable, EnhancedTableProps} from "../../components/table/EnhancedTable";
import {Connection} from "../../models/odahuflow/Connection";
import {ConnectionURLNewPrefix} from "./ConnectionEditablePage";

const ConnectionEnhancedTable = (props: EnhancedTableProps<Connection>) => <EnhancedTable {...props}/>;

export const ConnectionTable: React.FC = () => {
    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const dispatch = useDispatch();
    const connectionHeaders = ['Type', 'URI', 'Description', 'WEB UI'];

    return (
        <ConnectionEnhancedTable
            readonly={false}
            tableTitle="Connections"
            headers={connectionHeaders}
            data={connectionsState.data}
            length={connectionsState.length}
            onRefreshButtonClick={() => {
                dispatch(fetchAllConnectionRequest());
            }}
            onDeleteButtonClick={(selectedIDs) => {
                Promise.all(
                    selectedIDs.map(connID => dispatch(deleteConnectionRequest(connID)))
                ).then(() => {
                    dispatch(fetchAllConnectionRequest())
                });
            }}
            extractRow={conn => [
                conn.spec?.type,
                conn.spec?.uri,
                conn.spec?.description,
                conn.spec?.webUILink && (
                    <Link href={conn.spec?.webUILink} target={"_blank"}>
                        {conn.spec?.webUILink}
                    </Link>
                )
            ]}
            newUrlPrefix={ConnectionURLNewPrefix}
            pageUrlPrefix={ConnectionPageURLPrefix}
        />
    );
};
