import React from "react";
import {useParams} from "react-router-dom";
import {SaveButtonClick} from "../../components/actions";
import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";
import {ViewPage} from "../../components/ViewPage";
import {Editor} from "../../components/Editor";
import {
    editPackagingRequest,
    fetchAllPackagingRequest,
    fetchPackagingLogsRequest,
    fetchPackagingRequest
} from "../../store/packaging/actions";
import {PackagingView} from "./PackagingView";
import {EditablePackagingPage} from "./PackagingEditablePage";
import {LogsView} from "../../components/LogsView";
import {useFetchingEntity} from "../../components/EntitiyFetching";
import {createDashboardURL, GrafanaDashboard} from "../../components/Dashboard";
import {createLogsURL, LogsDashboard} from "../../components/Dashboard";

const saveButtonClick = new SaveButtonClick<ModelPackaging>(
    editPackagingRequest,
    fetchAllPackagingRequest,
    "Model Packaging submitted",
);

export const PackagingViewPage: React.FC = () => {
    const {id} = useParams();

    const {entity, loading, notFound} = useFetchingEntity(id as string, fetchPackagingRequest);

    return (
        <ViewPage
            loading={loading}
            notFound={notFound}
            tabHeaders={["View", "Edit", "YAML", "Logs", "Dashboard"]}
            tabValues={[
                <PackagingView
                    key="view"
                    packaging={entity}
                    status
                />,
                <EditablePackagingPage
                    key="page"
                    packaging={entity}
                    saveButtonClick={saveButtonClick}
                />,
                <Editor
                    key="yaml"
                    readonly={false}
                    entity={entity}
                    fileName={`${id}.packaging.odahuflow.yaml`}
                    saveButtonClick={saveButtonClick}
                />,
                <LogsDashboard
                    key="logs"
                    logsURL={createLogsURL(
                        // This is hardcode
                        "/kibana/app/kibana#/dashboard/0882d020-a6ba-11ea-bc41-3318d1349021",
                        {"kubernetes.pod_name": entity.status?.podName}
                    )}
                />,
                <GrafanaDashboard
                    key="grafana"
                    dashboardURL={createDashboardURL(
                        "/grafana/d/ab4f13a9892a76a4d21ce8c2445bf4ea/pods",
                        {namespace: "odahu-flow-packaging", pod: entity.status?.podName}
                    )}
                />
            ]}
        />
    )
};
