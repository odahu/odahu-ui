import React from 'react';
import {ParametersView} from "../../components/ParametersView";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";
import {checkValuePresent, TableParameterView} from "../../components/TablePrameterView";
import {isHyperParameter} from "./TrainingEditablePage";

export interface TrainingViewProps {
    training: ModelTraining;
    status: boolean;
}

export const TrainingView: React.FC<TrainingViewProps> = ({training, status}) => {
    // Parameters from spec field are always present
    const params = [
        {name: "ID", elem: training.id},
        {name: "Model name", elem: training.spec?.model?.name},
        {name: "Model version", elem: training.spec?.model?.version},
        {name: "Toolchain", elem: training.spec?.toolchain},
        {name: "Output Connection", elem: training.spec?.outputConnection},
        {name: "VCS Connection ID", elem: training.spec?.vcsName},
        {name: "Reference", elem: training.spec?.reference},
        {name: "Working directory", elem: training.spec?.workDir},
        {name: "Memory requests", elem: training.spec?.resources?.requests?.memory},
        {name: "Memory limits", elem: training.spec?.resources?.limits?.memory},
        {name: "CPU requests", elem: training.spec?.resources?.requests?.cpu},
        {name: "CPU limits", elem: training.spec?.resources?.limits?.cpu},
        {name: "Hyper Parameters", elem: checkValuePresent(training.spec?.hyperParameters) && (
                <TableParameterView
                    headers={["Name", "Value"]}
                    values={Object.entries(training.spec?.hyperParameters ?? {}).map(([key, value]) => {
                        if (isHyperParameter(value)) {
                            return [value.name, value.value];
                        } else {
                            return [key, String(value)];
                        }
                    })}
                />
            )},
        {name: "Environment variables", elem: training.spec?.envs && (
                <TableParameterView
                    headers={["Name", "Value"]}
                    values={training.spec?.envs?.map(env => [env.name, env.value])}
                />
            )},
        {name: 'Data section', elem: training.spec?.data && (
                <TableParameterView
                    style={{maxWidth: '40%'}}
                    headers={["Connection ID", "Target path", "Source path"]}
                    values={training.spec?.data?.map(data => [
                        data.connName, data.localPath, data.remotePath,
                    ])}
                />
            )},
    ];

    if (status) {
        params.push(
            {name: 'State', elem: training.status?.state},
            {name: 'Results', elem: training.status?.artifacts && (
                    <TableParameterView
                        style={{maxWidth: '40%'}}
                        headers={["Artifact Name", "Commit ID", "Run ID"]}
                        values={training.status?.artifacts?.map(run => [
                            run.artifactName, run.commitID, run.runId,
                        ])}
                    />
                )}
        )
    }

    return (
        <ParametersView params={params}/>
    )
};

