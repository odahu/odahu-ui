import React from 'react';
import {ParametersView, ViewParam} from "../../components/ParametersView";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";
import {checkValuePresent, TableParameterView} from "../../components/TablePrameterView";
import {isHyperParameter} from "./TrainingEditablePage";
import {humanDate} from "../../utils/date";
import {List, ListItem} from "@material-ui/core";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConfigurationState} from "../../store/configuration/types";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useTrainingViewStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootList: {
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const onExternalUrlClick = (url: string) => {
    // open an external URL in the new tab
    window.open(url, "_blank")
};

export interface TrainingViewProps {
    training: ModelTraining;
    status: boolean;
}

export const TrainingView: React.FC<TrainingViewProps> = ({training, status}) => {
    const classes = useTrainingViewStyles();
    const confState = useSelector<ApplicationState, ConfigurationState>(state => state.configuration);

    const params: Array<ViewParam> = [
        {name: "ID", elem: training.id},
        {name: "Model name", elem: training.spec?.model?.name},
        {name: "Model version", elem: training.spec?.model?.version},
        {name: "Toolchain", elem: training.spec?.toolchain},
        {name: 'Created at', elem: humanDate(training.createdAt)},
        {name: 'Updated at', elem: humanDate(training.updatedAt)},
    ];

    if (status) {
        params.push(
            {name: 'State', elem: training.status?.state},
        )
    }

    params.push(
        {name: "Output Connection", elem: training.spec?.outputConnection},
        {name: "VCS Connection ID", elem: training.spec?.vcsName},
        {name: "Reference", elem: training.spec?.reference},
        {name: "Working directory", elem: training.spec?.workDir},
        {name: "Memory requests", elem: training.spec?.resources?.requests?.memory},
        {name: "Memory limits", elem: training.spec?.resources?.limits?.memory},
        {name: "CPU requests", elem: training.spec?.resources?.requests?.cpu},
        {name: "CPU limits", elem: training.spec?.resources?.limits?.cpu},
        {
            name: "Hyper Parameters", elem: checkValuePresent(training.spec?.hyperParameters) && (
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
            )
        },
        {
            name: "Environment variables", elem: training.spec?.envs && (
                <TableParameterView
                    headers={["Name", "Value"]}
                    values={training.spec?.envs?.map(env => [env.name, env.value])}
                />
            )
        },
        {
            name: 'Data section', elem: training.spec?.data && (
                <TableParameterView
                    style={{maxWidth: '40%'}}
                    headers={["Connection ID", "Target path", "Source path"]}
                    values={training.spec?.data?.map(data => [
                        data.connName, data.localPath, data.remotePath,
                    ])}
                />
            )
        },
    );

    if (status) {
        params.push(
            {
                name: 'Results', elem: training.status?.artifacts && (
                    <List component="nav" className={classes.rootList}>
                        {
                            training.status?.artifacts?.map(artifact => (
                                <ListItem key={artifact.runId} component="nav">
                                    <List className={classes.rootList}>
                                        <ListItem>Artifact Name: {artifact.artifactName}</ListItem>
                                        <ListItem>Commit ID: {artifact.commitID}</ListItem>
                                        <ListItem
                                            button
                                            onClick={() => {
                                                onExternalUrlClick(`${confState.data.training?.metricUrl}#/experiments/0/runs/${artifact.runId}`)
                                            }}
                                        >
                                            Run ID: {artifact.runId}
                                        </ListItem>
                                    </List>
                                </ListItem>
                            ))
                        }
                    </List>
                )
            },
        )
    }

    return (
        <ParametersView params={params}/>
    )
};

