import React from 'react';
import {useParams} from "react-router-dom";

import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConnectionState} from "../../store/connections/types";
import {Editor} from "../../components/Editor";
import {EditableConnectionPage} from "./ConnectionEditablePage";
import {ViewPage} from "../../components/ViewPage";
import {SaveButtonClick} from "../../components/actions";
import {Connection} from "../../models/odahuflow/Connection";
import {editConnectionRequest, fetchAllConnectionRequest} from "../../store/connections/actions";
import {ConnectionView} from "./ConnectionView";

const tabHeaders = ["View", "Edit", "YAML"];
const editButtonClick = new SaveButtonClick<Connection>(
    editConnectionRequest,
    fetchAllConnectionRequest,
    "Connection was saved",
);

export const ConnectionViewPage: React.FC = () => {
    const {id} = useParams();

    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const connection = connectionsState.data[String(id)];

    return (
        <ViewPage
            loading={connectionsState.loading}
            notFound={!connection}
            tabHeaders={tabHeaders}
            tabValues={[
                <ConnectionView
                    key="view"
                    connection={connection}
                />,
                <EditableConnectionPage
                    key="page"
                    connection={connection}
                    saveButtonClick={editButtonClick}
                />,
                <Editor
                    key="yaml"
                    readonly={false}
                    entity={connection}
                    fileName={`${id}.connection.odahuflow.yaml`}
                    saveButtonClick={editButtonClick}
                />
            ]}
        />
    )
};
