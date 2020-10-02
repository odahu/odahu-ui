import React from "react";
import {useHistory, useParams} from "react-router-dom";
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
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {createKibanaEnabledSelector} from "../../store/configuration/types";
import {PackagingURLs} from "./urls";


export const PackagingViewPage: React.FC = () => {
    const {id} = useParams();
    const kibanaEnabled = useSelector<ApplicationState, boolean>(createKibanaEnabledSelector())

    const {entity, loading, notFound, setEntity} = useFetchingEntity(id as string, fetchPackagingRequest);
    const baseUrl = `${PackagingURLs.Page}/${id}`
    const history = useHistory();

    const saveButtonClick = new SaveButtonClick<ModelPackaging>(
        editPackagingRequest,
        fetchAllPackagingRequest,
        "Model Packaging submitted",
        (pack) => {
            setEntity(pack)
            history.push(baseUrl)
        }
    );

    const logsView = !kibanaEnabled ? <LogsView
                                                 key="logs"
                                                 entity={entity}
                                                 fileName={`${id}.logs.packaging.odahuflow.txt`}
                                                 fetchLogsRequest={fetchPackagingLogsRequest}
                                                 fetchEntityRequest={fetchPackagingRequest}
                                                /> : <LogsDashboard
                                                 key="logs"
                                                 logsURL={createLogsURL(
                                                   // This is hardcode
                                                   "/kibana/app/kibana#/dashboard/23e7b410-95b8-11ea-b67b-07a8a3aceb39",
                                                   {"kubernetes.pod_name": entity.status?.podName}
                                                 )}
                                                />;
    return (
        <ViewPage
            loading={loading}
            notFound={notFound}
            tabHeaders={["View", "Edit", "YAML", "Logs", "Dashboard"]}
            baseUrl={baseUrl}
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
                logsView,
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
