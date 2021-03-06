import React from 'react';
import {useParams, useHistory} from "react-router-dom";
import {Editor} from "../../components/Editor";
import {ViewPage} from "../../components/ViewPage";
import {SaveButtonClick} from "../../components/actions";
import {TrainingView} from "./TrainingView";
import {
    editTrainingRequest,
    fetchAllTrainingRequest,
    fetchTrainingLogsRequest,
    fetchTrainingRequest
} from "../../store/trainings/actions";
import {EditableTrainingPage} from "./TrainingEditablePage";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";
import {LogsView} from "../../components/LogsView";
import {useFetchingEntity} from "../../components/EntitiyFetching";
import {createDashboardURL, GrafanaDashboard} from "../../components/Dashboard";
import {createLogsURL, LogsDashboard} from "../../components/Dashboard";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {createKibanaEnabledSelector} from "../../store/configuration/types";
import {TrainingURLs} from "./urls";

const tabHeaders = ["View", "Edit", "YAML", "Logs", "Dashboard"];

export const TrainingPage: React.FC = () => {
    const {id} = useParams();
    const {entity, loading, notFound, setEntity} = useFetchingEntity(id as string, fetchTrainingRequest);
    const baseUrl = `${TrainingURLs.Page}/${id}`
    const history = useHistory();

    const editableSaveButtonClick = new SaveButtonClick<ModelTraining>(
        editTrainingRequest,
        fetchAllTrainingRequest,
        "Model Training submitted",
        (training) => {
            setEntity(training)
            history.push(baseUrl)
        }
    );

    const kibanaEnabled = useSelector<ApplicationState, boolean>(createKibanaEnabledSelector())
 
    const logsView = !kibanaEnabled ? <LogsView
                                                 key="logs"
                                                 entity={entity}
                                                 fileName={`${id}.logs.training.odahuflow.txt`}
                                                 fetchLogsRequest={fetchTrainingLogsRequest}
                                                 fetchEntityRequest={fetchTrainingRequest}
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
            tabHeaders={tabHeaders}
            baseUrl={baseUrl}
            tabValues={[
                <TrainingView
                    key="view"
                    training={entity}
                    status
                />,
                <EditableTrainingPage
                    key="edit"
                    training={entity}
                    saveButtonClick={editableSaveButtonClick}
                />,
                <Editor
                    key="yaml"
                    readonly={false}
                    entity={entity}
                    fileName={`${id}.training.odahuflow.yaml`}
                    saveButtonClick={editableSaveButtonClick}
                />,
                logsView,
                <GrafanaDashboard
                    key="grafana"
                    dashboardURL={createDashboardURL(
                        // This hardcode
                        "/grafana/d/6581e46e4e5c7ba40a07646395ef7b23/kubernetes-compute-resources-pod",
                        {namespace: "odahu-flow-training", pod: entity.status?.podName}
                    )}
                />
            ]}
        />
    )
};
