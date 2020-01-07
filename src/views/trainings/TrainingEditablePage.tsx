import React from 'react';
import {EditablePage} from "../../components/EditablePage";
import {SaveButtonClick} from "../../components/actions";
import {ConnectionTypes} from "../connections/types";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConnectionState} from "../../store/connections/types";
import {TrainingView} from "./TrainingView";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";
import {createTrainingRequest, fetchAllTrainingRequest} from "../../store/trainings/actions";
import {ToolchainState} from "../../store/toolchains/types";
import {useParams} from "react-router-dom";
import {ModelTrainingState} from "../../store/trainings/types";
import {TrainingMetaSchema, TrainingSchema} from "./editable/schemas";
import {MetadataElements} from "./editable/MetadataElements";
import {HyperParameter, SpecElements} from "./editable/SpecElements";
import {TrainingURLs} from "./urls";
import {ModelTrainingSpec} from "../../models/odahuflow/ModelTrainingSpec";
import {extractZeroElement} from "../../utils";
import {deepCopy} from "../../utils/enities";


function defaultTrainingSpec(toolchain = '', vcsName = ''): ModelTrainingSpec {
    return {
        entrypoint: '',
        toolchain: toolchain,
        data: [],
        envs: [],
        model: {name: '', version: ''},
        vcsName: vcsName,
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
    }
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
    redirectURL: TrainingURLs.Page,
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
        />
    );
};

export const NewTrainingPage: React.FC = () => {
    const toolchainState = useSelector<ApplicationState, ToolchainState>(state => state.toolchains);
    const toolchainIDs = Object.values(toolchainState.data).map(toolchain => toolchain.id);

    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const connectionIDs = Object.values(connectionsState.data)
        .filter(conn => conn.spec?.type === ConnectionTypes.S3 ||
            conn.spec?.type === ConnectionTypes.GCS ||
            conn.spec?.type === ConnectionTypes.AZUREBLOB)
        .map(conn => conn.id);

    return (
        <EditablePage
            {...defaultFields}
            title="New Training"
            entity={{
                id: '',
                spec: defaultTrainingSpec(
                    extractZeroElement(toolchainIDs, ''),
                    extractZeroElement(connectionIDs, '')
                )
            }}
        />
    );
};


export interface CloneTrainingPageProps {
    training?: ModelTraining;
}

export const NewCloneTrainingPage: React.FC<CloneTrainingPageProps> = () => {
    const {id} = useParams();

    const trainingState = useSelector<ApplicationState, ModelTrainingState>(state => state.trainings);
    const training = trainingState.data[String(id)];

    return (
        <EditablePage
            {...defaultFields}
            title="Clone Training"
            entity={{
                id: '',
                spec: Object.assign(
                    defaultTrainingSpec(),
                    processHyperParams(training).spec
                )
            }}
        />
    );
};
