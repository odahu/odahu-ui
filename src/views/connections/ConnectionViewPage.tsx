import React from 'react';
import {useParams} from "react-router-dom";
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

const tabHeaders = ["View", "Edit", "YAML"];
const editButtonClick = new SaveButtonClick<Connection>(
    editConnectionRequest,
    fetchAllConnectionRequest,
    "Connection submitted",
);

export const ConnectionViewPage: React.FC = () => {
    const {id} = useParams();

    const {entity, loading, notFound} = useFetchingEntity(id as string, fetchConnectionRequest);

    return (
        <ViewPage
            loading={loading}
            notFound={notFound}
            tabHeaders={tabHeaders}
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
                    readonly={false}
                    entity={entity}
                    fileName={`${id}.connection.odahuflow.yaml`}
                    saveButtonClick={editButtonClick}
                />
            ]}
        />
    )
};
