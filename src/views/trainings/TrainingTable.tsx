import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedTable, EnhancedTableProps} from "../../components/table/EnhancedTable";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";
import {ModelTrainingState} from "../../store/trainings/types";
import {deleteTrainingRequest, fetchAllTrainingRequest} from "../../store/trainings/actions";
import {Link as RouterLink, Redirect} from "react-router-dom";
import {TrainingURLs} from "./urls";
import {join} from "path";
import {ConnectionURLs} from "../connections/urls";
import {TrainingIntegrationURLs} from "../training_integrations/urls";
import {humanDate} from "../../utils/date";
import {PackagingURLs} from "../packagings/urls";
import WorkIcon from '@material-ui/icons/Work';

const TrainingEnhancedTable = (props: EnhancedTableProps<ModelTraining>) => <EnhancedTable {...props}/>;

const headers = ['Training Integration', 'Model Name', 'Model Version', 'Algorithm Source Connection', 'State', 'Created at', 'Updated at'];
const extractRow = (mt: ModelTraining) => [
    (
        <RouterLink
            key="trainingIntegration"
            to={join(TrainingIntegrationURLs.Page, mt.spec?.trainingIntegration ?? '')}
        >
            {mt.spec?.trainingIntegration}
        </RouterLink>
    ),
    mt.spec?.model?.name,
    mt.spec?.model?.version,
    (
        <RouterLink
            key="algorithmSource"
            to={join(ConnectionURLs.Page, mt.spec?.algorithmSource?.vcs?.connection ?? mt.spec?.algorithmSource?.objectStorage?.connection ?? '')}
        >
            {mt.spec?.algorithmSource?.vcs?.connection ?? mt.spec?.algorithmSource?.objectStorage?.connection}
        </RouterLink>
    ),
    mt.status?.state,
    humanDate(mt.createdAt),
    humanDate(mt.updatedAt)
];
const extractRowValues = (mt: ModelTraining) => [
    mt.spec?.trainingIntegration, mt.spec?.model?.name, mt.spec?.model?.version,
    mt.spec?.algorithmSource?.vcs?.connection ?? mt.spec?.algorithmSource?.objectStorage?.connection,
    mt.status?.state, humanDate(mt.createdAt), humanDate(mt.updatedAt)
];

export const TrainingTable: React.FC = () => {

    const [redirectTo, setRedirect] = React.useState<string>("")

    const trainingState = useSelector<ApplicationState, ModelTrainingState>(state => state.trainings);
    const dispatch = useDispatch();

    const onDeleteButtonClick = (selectedIDs: string[]) => {
        Promise.all(
            selectedIDs.map(mdID => dispatch(deleteTrainingRequest(mdID)))
        ).then(() => {
            dispatch(fetchAllTrainingRequest())
        });
    };

    const onRefreshButtonClick = () => {
        dispatch(fetchAllTrainingRequest());
    };

    if (redirectTo) {
        return <Redirect push to={`${PackagingURLs.FromTraining}/${redirectTo}`}/>
    }

    return (
        <TrainingEnhancedTable
            readonly={false}
            tableTitle="Model Trainings"
            headers={headers}
            data={trainingState.data}
            length={trainingState.length}
            onRefreshButtonClick={onRefreshButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
            extractRow={extractRow}
            extractRowValues={extractRowValues}
            newUrlPrefix={TrainingURLs.New}
            pageUrlPrefix={TrainingURLs.Page}
            cloneUrlPrefix={TrainingURLs.Clone}
            oneRowSelectedButtons={[
                {
                    onClick: (id: string) => {setRedirect(id)},
                    text: "Pack",
                    icon: WorkIcon
                }
            ]}
        />
    );
};
