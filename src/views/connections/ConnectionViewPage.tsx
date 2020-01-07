import React from 'react';
import {useParams} from "react-router-dom";

import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConnectionState} from "../../store/connections/types";
import {ConnectionView} from "./types/common";
import {Editor} from "../../components/Editor";
import {EditableConnectionPage} from "./ConnectionEditablePage";
import {ViewPage} from "../../components/ViewPage";
import {SaveButtonClick} from "../../components/actions";
import {Connection} from "../../models/odahuflow/Connection";
import {editConnectionRequest, fetchAllConnectionRequest} from "../../store/connections/actions";

export const ConnectionPageURLPrefix = "/connections/item";

export const ConnectionViewPage: React.FC = () => {
    // Parameter from URL
    const {id} = useParams();

    // Global state
    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    // We keep all entities in global state. In the future, we should make http request if entity missed
    const connection = connectionsState.data[String(id)];

    const saveButtonClick = new SaveButtonClick<Connection>(
        editConnectionRequest,
        fetchAllConnectionRequest,
        "Connection was saved",
    );

    return (
        <ViewPage
            loading={connectionsState.loading}
            notFound={!connection}
            tabHeaders={["View", "Edit", "YAML"]}
            tabValues={[
                <ConnectionView
                    key="view"
                    connection={connection}
                />,
                <EditableConnectionPage
                    key="page"
                    connection={connection}
                    saveButtonClick={saveButtonClick}
                />,
                <Editor
                    key="yaml"
                    readonly={false}
                    entity={connection}
                    fileName={`${id}.connection.odahuflow.yaml`}
                    saveButtonClick={saveButtonClick}
                />
            ]}
        />
    )
};
