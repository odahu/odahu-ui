import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {Editor} from "../../components/Editor";
import {EditableConnectionPage} from "./ConnectionEditablePage";
import {ViewPage} from "../../components/ViewPage";
import {SaveButtonClick} from "../../components/actions";
import {Connection} from "../../models/odahuflow/Connection";
import {
    editConnectionRequest,
    fetchAllConnectionRequest,
    fetchConnectionRequest
} from "../../store/connections/actions";
import {ConnectionView} from "./ConnectionView";
import {useFetchingEntity} from "../../components/EntitiyFetching";
import {ConnectionURLs} from "./urls";

const tabHeaders = ["View", "Edit", "YAML"];

export const ConnectionViewPage: React.FC = () => {
    const {id} = useParams();

    const {entity, loading, notFound, setEntity} = useFetchingEntity(id as string, fetchConnectionRequest);
    const baseUrl = `${ConnectionURLs.Page}/${id}`
    const history = useHistory();

    const editButtonClick = new SaveButtonClick<Connection>(
        editConnectionRequest,
        fetchAllConnectionRequest,
        "Connection submitted",
        (conn) => {
            setEntity(conn)
            history.push(baseUrl)
        }
    );

    return (
        <ViewPage
            loading={loading}
            notFound={notFound}
            tabHeaders={tabHeaders}
            baseUrl={baseUrl}
            tabValues={[
                <ConnectionView
                    key="view"
                    connection={entity}
                    status={true}
                />,
                <EditableConnectionPage
                    key="page"
                    connection={entity}
                    saveButtonClick={editButtonClick}
                />,
                <Editor
                    key="yaml"
                    warning={true}
                    readonly={false}
                    entity={entity}
                    fileName={`${id}.connection.odahuflow.yaml`}
                    saveButtonClick={editButtonClick}
                />
            ]}
        />
    )
};
