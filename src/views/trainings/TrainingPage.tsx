import React from 'react';
import {useParams} from "react-router-dom";
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


const tabHeaders = ["View", "Edit", "YAML", "Logs", "Dashboard"];
const editableSaveButtonClick = new SaveButtonClick<ModelTraining>(
    editTrainingRequest,
    fetchAllTrainingRequest,
    "Model Training submitted",
);

export const TrainingPage: React.FC = () => {
    const {id} = useParams();

    const {entity, loading, notFound} = useFetchingEntity(id as string, fetchTrainingRequest);

    return (
        <ViewPage
            loading={loading}
            notFound={notFound}
            tabHeaders={tabHeaders}
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
                <LogsView
                    key="logs"
                    entity={entity}
                    fileName={`${id}.logs.training.odahuflow.txt`}
                    fetchLogsRequest={fetchTrainingLogsRequest}
                    fetchEntityRequest={fetchTrainingRequest}
                />,
                <GrafanaDashboard
                    key="grafana"
                    dashboardURL={createDashboardURL(
                        // This hardcode
                        "/grafana/d/ab4f13a9892a76a4d21ce8c2445bf4ea/pods",
                        {namespace: "odahu-flow-training", pod: entity.status?.podName}
                    )}
                />
            ]}
        />
    )
};
