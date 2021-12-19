import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedReadonlyTableProps, EnhancedTable} from "../../components/table/EnhancedTable";
import {TrainingIntegration} from "../../models/odahuflow/TrainingIntegration";
import {TrainingIntegrationState} from "../../store/training_integrations/types";
import {fetchAllTrainingIntegrationRequest} from "../../store/training_integrations/actions";
import {TrainingIntegrationURLs} from "./urls";
import {humanDate} from "../../utils/date";

const TrainingIntegrationEnhancedTable = (props: EnhancedReadonlyTableProps<TrainingIntegration>) => <EnhancedTable {...props}/>;

const headers = ['Default Docker Image', 'Entrypoint', 'Created at', 'Updated at'];
const extractRow = (trainingIntegration: TrainingIntegration) => [
    trainingIntegration.spec?.defaultImage,
    trainingIntegration.spec?.entrypoint,
    humanDate(trainingIntegration.createdAt),
    humanDate(trainingIntegration.updatedAt)
];
const extractRowValues = (trainingIntegration: TrainingIntegration) => [
    trainingIntegration.spec?.defaultImage,
    trainingIntegration.spec?.entrypoint,
    humanDate(trainingIntegration.createdAt),
    humanDate(trainingIntegration.updatedAt)
];

export const TrainingIntegrationTable: React.FC = () => {
    const trainingIntegrationState = useSelector<ApplicationState, TrainingIntegrationState>(state => state.trainingIntegrations);
    const dispatch = useDispatch();

    const onRefreshButtonClick = () => {
        dispatch(fetchAllTrainingIntegrationRequest());
    };

    return (
        <TrainingIntegrationEnhancedTable
            readonly={true}
            tableTitle="Training Integrations"
            headers={headers}
            data={trainingIntegrationState.data}
            length={trainingIntegrationState.length}
            onRefreshButtonClick={onRefreshButtonClick}
            extractRow={extractRow}
            extractRowValues={extractRowValues}
            pageUrlPrefix={TrainingIntegrationURLs.Page}
        />
    );
};
