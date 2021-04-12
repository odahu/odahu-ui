import React from 'react';
import {EditablePage} from "../../components/EditablePage";
import {SaveButtonClick} from "../../components/actions";
import {ConnectionTypes} from "../connections/types";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConnectionState} from "../../store/connections/types";
import {TrainingView} from "./TrainingView";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";
import {createTrainingRequest, fetchAllTrainingRequest, fetchTrainingRequest} from "../../store/trainings/actions";
import {ToolchainState} from "../../store/toolchains/types";
import {TrainingMetaSchema, TrainingSchema} from "./editable/schemas";
import {MetadataElements} from "./editable/MetadataElements";
import {HyperParameter, SpecElements} from "./editable/SpecElements";
import {TrainingURLs} from "./urls";
import {ModelTrainingSpec} from "../../models/odahuflow/ModelTrainingSpec";
import {extractZeroElement} from "../../utils";
import {addSuffixToID, deepCopy, merge} from "../../utils/enities";
import {FetchingEntity} from "../../components/EntitiyFetching";
import {ConfigurationState} from "../../store/configuration/types";
import {useHistory} from "react-router-dom";

function defaultTrainingSpec(mts?: ModelTrainingSpec): ModelTrainingSpec {
    return merge({
        entrypoint: '',
        toolchain: '',
        data: [],
        envs: [],
        model: {name: '', version: ''},
        algorithmSource: {
            vcs: {
                connection: '',
                reference: '',
            }
        },
        workDir: './',
        outputConnection: '',
        resources: {
            requests: {
                cpu: '',
                gpu: '',
                memory: '',
            },
            limits: {
                cpu: '',
                gpu: '',
                memory: '',
            },
        }
    }, mts ?? {})
}

function processHyperParamsBeforeSubmit(training: ModelTraining): ModelTraining {
    // Deep copy
    training = deepCopy(training);
    const packArguments: HyperParameter[] = training.spec?.hyperParameters ?? [];
    const realHyperParameters: Record<string, string> = {};

    for (const argument of packArguments) {
        realHyperParameters[argument.name] = argument.value;
    }

    if (training.spec?.hyperParameters) {
        training.spec.hyperParameters = realHyperParameters;
    }

    return training;
}

function processHyperParams(training: ModelTraining): ModelTraining {
    // Deep copy
    training = deepCopy(training);

    if (training.spec?.hyperParameters && typeof training.spec.hyperParameters === "object") {
        training.spec.hyperParameters = Object.entries(training.spec.hyperParameters).map(([name, value]) => {
            return {name, value}
        });
    }

    return training;
}

export function isHyperParameter(value: any): value is HyperParameter {
    return value?.hasOwnProperty('name') && value?.hasOwnProperty('value');
}

const defaultFields = {
    schemas: {
        metadata: TrainingMetaSchema,
        spec: TrainingSchema,
    },
    fields: {
        metadata: () => <MetadataElements/>,
        spec: () => <SpecElements/>,
        review: (training: ModelTraining) => <TrainingView training={training} status={false}/>,
    },
    saveButtonClick: new SaveButtonClick<ModelTraining>(
        createTrainingRequest,
        fetchAllTrainingRequest,
        "Model Training was created",
    ),
    processBeforeSubmit: processHyperParamsBeforeSubmit,
};

export interface EditableTrainingPageProps {
    training: ModelTraining;
    saveButtonClick: SaveButtonClick<ModelTraining>;
}

export const EditableTrainingPage: React.FC<EditableTrainingPageProps> = ({training, saveButtonClick}) => {
    return (
        <EditablePage
            {...defaultFields}
            title="Edit Training"
            entity={processHyperParams(training)}
            saveButtonClick={saveButtonClick}
            fields={{
                metadata: () => <MetadataElements readonlyID/>,
                spec: () => <SpecElements/>,
                review: (training: ModelTraining) => <TrainingView training={training} status={false}/>,
            }}
        />
    );
};

export const NewTrainingPage: React.FC = () => {
    const toolchainState = useSelector<ApplicationState, ToolchainState>(state => state.toolchains);
    const toolchainIDs = Object.values(toolchainState.data).map(toolchain => toolchain.id);

    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const vcsConnectionID = Object.values(connectionsState.data)
        .filter(conn => conn.spec?.type === ConnectionTypes.GIT)
        .map(conn => conn.id);

    const config = useSelector<ApplicationState, ConfigurationState>(state => state.configuration);

    const history = useHistory()
    const btn = new SaveButtonClick<ModelTraining>(
        createTrainingRequest,
        fetchAllTrainingRequest,
        "Training was created",
        (entity) => {
            const redirectTo = `${TrainingURLs.Page}/${entity.id}`
            history.push(redirectTo)
        }
    )

    return (
        <EditablePage
            {...defaultFields}
            saveButtonClick={btn}
            title="New Training"
            entity={{
                id: '',
                spec: defaultTrainingSpec({
                    toolchain: extractZeroElement(toolchainIDs, ''),
                    algorithmSource: {
                        vcs: {
                            connection: extractZeroElement(vcsConnectionID, '')
                        }
                    },
                    outputConnection: config.data.training?.outputConnectionID,
                    resources: config.data.training?.defaultResources,
                })
            }}
        />
    );
};

export const NewCloneTrainingPage: React.FC = () => {

    const history = useHistory()

    return (
        <FetchingEntity
            fetchAction={fetchTrainingRequest}
        >
            {
                (training: ModelTraining) => (
                    <EditablePage
                        {...defaultFields}
                        title="Clone Training"
                        saveButtonClick={new SaveButtonClick<ModelTraining>(
                            createTrainingRequest,
                            fetchAllTrainingRequest,
                            "Model Training was submitted",
                            (entity) => {
                                const redirectTo = `${TrainingURLs.Page}/${entity.id}`
                                history.push(redirectTo)
                            }
                        )}
                        entity={{
                            id: addSuffixToID(training.id as string, '-clone'),
                            spec: defaultTrainingSpec(processHyperParams(training).spec),
                        }}
                    />
                )
            }
        </FetchingEntity>
    );
};
