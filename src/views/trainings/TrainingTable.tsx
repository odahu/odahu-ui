import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedTable, EnhancedTableProps} from "../../components/table/EnhancedTable";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";
import {ModelTrainingState} from "../../store/trainings/types";
import {deleteTrainingRequest, fetchAllTrainingRequest} from "../../store/trainings/actions";
import {Link as RouterLink} from "react-router-dom";
import {TrainingURLs} from "./urls";
import {join} from "path";
import {ConnectionURLs} from "../connections/urls";
import {ToolchainURLs} from "../toolchains/urls";

const TrainingEnhancedTable = (props: EnhancedTableProps<ModelTraining>) => <EnhancedTable {...props}/>;

const headers = ['Toolchain', 'Model Name', 'Model Version', 'VCS ID', 'State'];
const extractRow = (mt: ModelTraining) => [
    (
        <RouterLink
            key="toolchain"
            to={join(ToolchainURLs.Page, mt.spec?.toolchain ?? '')}
        >
            {mt.spec?.toolchain}
        </RouterLink>
    ),
    mt.spec?.model?.name,
    mt.spec?.model?.version,
    (
        <RouterLink
            key="vcs"
            to={join(ConnectionURLs.Page, mt.spec?.vcsName ?? '')}
        >
            {mt.spec?.vcsName}
        </RouterLink>
    ),
    mt.status?.state
];

export const TrainingTable: React.FC = () => {
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
            newUrlPrefix={TrainingURLs.New}
            pageUrlPrefix={TrainingURLs.Page}
            cloneUrlPrefix={TrainingURLs.Clone}
        />
    );
};
