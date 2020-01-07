import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ApplicationState} from "../../store";
import {EnhancedTable, EnhancedTableProps} from "../../components/table/EnhancedTable";
import {TrainingURLNewPrefix} from "./TrainingEditablePage";
import {TrainingURLPagePrefix} from "./TrainingPage";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";
import {ModelTrainingState} from "../../store/trainings/types";
import {deleteTrainingRequest, fetchAllTrainingRequest} from "../../store/trainings/actions";
import {TrainingURLSimilarPrefix} from "./Trainings";
import {Link as RouterLink} from "react-router-dom";
import {ToolchainURLPagePrefix} from "../toolchains/ToolchainPage";
import {ConnectionPageURLPrefix} from "../connections/ConnectionViewPage";

const TrainingEnhancedTable = (props: EnhancedTableProps<ModelTraining>) => <EnhancedTable {...props}/>;

export const TrainingTable: React.FC = () => {
    const trainingState = useSelector<ApplicationState, ModelTrainingState>(state => state.trainings);
    const dispatch = useDispatch();
    const headers = ['Toolchain', 'Model Name', 'Model Version', 'VCS ID', 'State'];

    return (
        <TrainingEnhancedTable
            readonly={false}
            tableTitle="Model Trainings"
            headers={headers}
            data={trainingState.data}
            length={trainingState.length}
            onRefreshButtonClick={() => {
                dispatch(fetchAllTrainingRequest());
            }}
            onDeleteButtonClick={(selectedIDs) => {
                Promise.all(
                    selectedIDs.map(mdID => dispatch(deleteTrainingRequest(mdID)))
                ).then(() => {
                    dispatch(fetchAllTrainingRequest())
                });
            }}
            extractRow={mt => [
                (
                    <RouterLink key="toolchain" to={`${ToolchainURLPagePrefix}/${mt.spec?.toolchain}`}>
                        {mt.spec?.toolchain}
                    </RouterLink>
                ),
                mt.spec?.model?.name,
                mt.spec?.model?.version,
                (
                    <RouterLink key="vcs" to={`${ConnectionPageURLPrefix}/${mt.spec?.vcsName}`}>
                        {mt.spec?.vcsName}
                    </RouterLink>
                ),
                mt.status?.state
            ]}
            newUrlPrefix={TrainingURLNewPrefix}
            pageUrlPrefix={TrainingURLPagePrefix}
            newSimilarUrlPrefix={TrainingURLSimilarPrefix}
        />
    );
};
