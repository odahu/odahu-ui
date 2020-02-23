import React from 'react';
import {useParams} from "react-router-dom";

import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
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
import {ModelTrainingState} from "../../store/trainings/types";
import {EditableTrainingPage} from "./TrainingEditablePage";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";
import {LogsView} from "../../components/LogsView";

const tabHeaders = ["View", "Edit", "YAML", "Logs"];

export const TrainingPage: React.FC = () => {
    const {id} = useParams();

    const trainingState = useSelector<ApplicationState, ModelTrainingState>(state => state.trainings);
    // TODO: fetch from server if missing
    const training = trainingState.data[String(id)];

    const saveButtonClick = new SaveButtonClick<ModelTraining>(
        editTrainingRequest,
        fetchAllTrainingRequest,
        "Model Training was saved",
    );

    return (
        <ViewPage
            loading={trainingState.loading}
            notFound={!training}
            tabHeaders={tabHeaders}
            tabValues={[
                <TrainingView
                    key="view"
                    training={training}
                    status
                />,
                <EditableTrainingPage
                    key="edit"
                    training={training}
                    saveButtonClick={saveButtonClick}
                />,
                <Editor
                    key="yaml"
                    readonly={false}
                    entity={training}
                    fileName={`${id}.training.odahuflow.yaml`}
                    saveButtonClick={saveButtonClick}
                />,
                <LogsView
                    key="logs"
                    entity={training}
                    fileName={`${id}.logs.training.odahuflow.txt`}
                    fetchLogsRequest={fetchTrainingLogsRequest}
                    fetchEntityRequest={fetchTrainingRequest}
                />
            ]}
        />
    )
};
