import React from 'react';
import {ParametersView, ViewParam} from "../../components/ParametersView";
import {TableParameterView} from "../../components/TablePrameterView";
import {TrainingIntegration} from "../../models/odahuflow/TrainingIntegration";
import {humanDate} from "../../utils/date";

export interface TrainingIntegrationViewProps {
    trainingIntegration: TrainingIntegration;
    status: boolean;
}

export const TrainingIntegrationView: React.FC<TrainingIntegrationViewProps> = ({trainingIntegration, status}) => {
    const params: Array<ViewParam> = [
        {name: "ID", elem: trainingIntegration.id},
    ];

    if (status) {
        params.push(
            {name: "Created at", elem: humanDate(trainingIntegration.createdAt)},
            {name: "Updated at", elem: humanDate(trainingIntegration.updatedAt)},
        )
    }

    params.push(
        {name: "Default image", elem: trainingIntegration.spec?.defaultImage},
        {name: "Entrypoint", elem: trainingIntegration.spec?.entrypoint},
        {
            name: "Environment variables", elem: (
                <TableParameterView
                    style={{maxWidth: '50%', minWidth: '30%'}}
                    headers={["Name", "Value"]}
                    values={Object.entries(trainingIntegration.spec?.additionalEnvironments ?? {})}
                />
            )
        },
    );

    return (
        <ParametersView params={params}/>
    )
};
