import React from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {SaveButtonClick} from "../../components/actions";
import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";
import {ViewPage} from "../../components/ViewPage";
import {Editor} from "../../components/Editor";
import {editPackagingRequest, fetchAllPackagingRequest, fetchPackagingLogsRequest} from "../../store/packaging/actions";
import {PackagingView} from "./PackagingView";
import {EditablePackagingPage} from "./PackagingEditablePage";
import {ModelPackagingState} from "../../store/packaging/types";
import {LogsView} from "../../components/LogsView";

export const PackagingURLPagePrefix = "/packagings/item";

export const PackagingViewPage: React.FC = () => {
    // Parameter from URL
    const {id} = useParams();

    // Global state
    const packagingState = useSelector<ApplicationState, ModelPackagingState>(state => state.packagings);
    // We keep all entities in global state. In the future, we should make http request if entity missed
    const packaging = packagingState.data[String(id)];

    const saveButtonClick = new SaveButtonClick<ModelPackaging>(
        editPackagingRequest,
        fetchAllPackagingRequest,
        "Model Packaging was saved",
    );

    return (
        <ViewPage
            loading={packagingState.loading}
            notFound={!packaging}
            tabHeaders={["View", "Edit", "YAML", "Logs"]}
            tabValues={[
                <PackagingView
                    key="view"
                    packaging={packaging}
                    status
                />,
                <EditablePackagingPage
                    key="page"
                    packaging={packaging}
                    saveButtonClick={saveButtonClick}
                />,
                <Editor
                    key="yaml"
                    readonly={false}
                    entity={packaging}
                    fileName={`${id}.packaging.odahuflow.yaml`}
                    saveButtonClick={saveButtonClick}
                />,
                <LogsView
                    key="logs"
                    entity={packaging}
                    fileName={`${id}.logs.packaging.odahuflow.txt`}
                    fetchLogsRequest={fetchPackagingLogsRequest}
                />
            ]}
        />
    )
};
