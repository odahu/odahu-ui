import React from 'react';
import {EditablePage} from "../../components/EditablePage";
import {Paper, Typography} from "@material-ui/core";
import * as Yup from "yup";
import {SaveButtonClick} from "../../components/actions";
import {ConnectionTypes} from "../connections/types";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConnectionState} from "../../store/connections/types";
import {TrainingView} from "./TrainingView";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";
import {createTrainingRequest, fetchAllTrainingRequest} from "../../store/trainings/actions";
import {TrainingURLPagePrefix} from "./TrainingPage";
import {FieldArray, useFormikContext} from "formik";
import {InputParametersView, ItemInputParametersView} from "../../components/InputParametersView";
import {ToolchainState} from "../../store/toolchains/types";
import {FormikOdahuSelect} from "../../components/OdahuSelect";
import {ResourcesSpecElements} from "../../components/ResourceSpecElements";
import {OdahuTextField} from "../../components/CustomTextField";
import {useParams} from "react-router-dom";
import {ModelTrainingState} from "../../store/trainings/types";
import {IDSchema, useFieldsStyles} from "../../components/fields";

export const TrainingURLNewPrefix = "/trainings/new";

const TrainingMetaSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        image: Yup.string(),
        toolchain: Yup.string().required('Toolchain is a required field'),
        model: Yup.object().shape({
            name: Yup.string().required('Model name is a required field'),
            version: Yup.string().required('Model version is a required field'),
        }),
    }),
});

// TODO: refactor
const TrainingSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        image: Yup.string(),
        model: Yup.object().shape({
            name: Yup.string().required('Model name is a required field'),
            version: Yup.string().required('Model version is a required field'),
        }),
        entrypoint: Yup.string().required('Entrypoint is a required field'),
        toolchain: Yup.string().required('Toolchain is a required field'),
        envs: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Name is a required field'),
                value: Yup.string().required('Value is a required field'),
            })
        ),
        data: Yup.array().of(
            Yup.object().shape({
                connName: Yup.string().required('Connection ID is a required field'),
                localPath: Yup.string().required('Local path is a required field'),
                remotePath: Yup.string()
            }),
        ),
        hyperParameters: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Name is a required field'),
                value: Yup.string().required('Value is a required field'),
            }),
        ),
    }),
});

const MetadataElements: React.FC = () => {
    const toolchainState = useSelector<ApplicationState, ToolchainState>(state => state.toolchains);
    const toolchainIDs = Object.values(toolchainState.data).map(toolchain => toolchain.id);

    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const connectionIDs = Object.values(connectionsState.data)
        .filter(conn => conn.spec?.type === ConnectionTypes.S3 ||
            conn.spec?.type === ConnectionTypes.GCS ||
            conn.spec?.type === ConnectionTypes.AZUREBLOB)
        .map(conn => conn.id);

    return (
        <>
            <OdahuTextField
                name="id"
                label='ID'
                description="Unique value among all connections"
            />
            <OdahuTextField
                name="spec.model.name"
                label='Model name'
                description='Human-readable model name'
            />
            <OdahuTextField
                name="spec.model.version"
                label='Model version'
                description='Human-readable model value'
            />
            <FormikOdahuSelect
                name="spec.toolchain"
                label="Toolchain"
                defaultValue={toolchainIDs[0]}
                options={toolchainIDs}
            />
            <FormikOdahuSelect
                name="spec.outputConnection"
                label="Output connection"
                options={connectionIDs}
            />
        </>
    )
};

const GitSpecElements: React.FC = () => {
    const classes = useFieldsStyles();

    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const vcsConnectionIDs = Object.values(connectionsState.data)
        .filter(conn => conn.spec?.type === ConnectionTypes.GIT)
        .map(conn => conn.id);

    return (
        <Paper className={classes.fields}>
            <Typography style={{margin: '5px'}}>GIT Settings</Typography>
            <FormikOdahuSelect
                name="spec.vcsName"
                label="VCS ID"
                style={{maxWidth: '90%'}}
                options={vcsConnectionIDs}
                description='A connection which describes credentials to a GIT repository'
            />
            <OdahuTextField
                name="spec.reference"
                label='Reference'
                style={{maxWidth: '90%'}}
                description='a branch, tag, or commit'
            />
            <OdahuTextField
                name="spec.workDir"
                label={'Work dir'}
                style={{maxWidth: '90%'}}
                description='Relative model location'
            />
        </Paper>
    )
};

const DataSection: React.FC = () => {
    const formik = useFormikContext<ModelTraining>();

    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const connectionIDs = Object.values(connectionsState.data)
        .filter(conn => conn.spec?.type === ConnectionTypes.S3 ||
            conn.spec?.type === ConnectionTypes.GCS ||
            conn.spec?.type === ConnectionTypes.AZUREBLOB)
        .map(conn => conn.id);

    return (
        <FieldArray
            name="spec.data"
            render={arrayHelpers => (
                <InputParametersView
                    arrayHelpers={arrayHelpers}
                    createNewElem={() => {
                        return {
                            connName: connectionIDs[0],
                            locaPath: '',
                            remotePath: ''
                        }
                    }}
                    header="Data section"
                    style={{minWidth: '50%', maxWidth: '50%'}}
                >
                    {formik.values.spec?.data?.map((data, index) => (
                            <ItemInputParametersView arrayHelpers={arrayHelpers} index={index}>
                                <FormikOdahuSelect
                                    name={`spec.data.${index}.connName`}
                                    label="Connection ID"
                                    defaultValue={connectionIDs[0]}
                                    style={{minWidth: '30%', maxWidth: '30%', paddingRight: '10px'}}
                                    options={connectionIDs}
                                >
                                </FormikOdahuSelect>
                                <OdahuTextField
                                    name={`spec.data.${index}.localPath`}
                                    label='Target Path'
                                    style={{minWidth: '30%', maxWidth: '30%', paddingRight: '10px'}}
                                    className={''}
                                />
                                <OdahuTextField
                                    name={`spec.data.${index}.remotePath`}
                                    label='Source Path'
                                    style={{minWidth: '30%', maxWidth: '30%'}}
                                    className={''}
                                />
                            </ItemInputParametersView>
                        )
                    )}
                </InputParametersView>
            )}
        />
    )
};

export interface HyperParameter {
    name: string;
    value: string;
}

const HyperParametersSection: React.FC = () => {
    const formik = useFormikContext<ModelTraining>();

    return (
        <FieldArray
            name="spec.hyperParameters"
            render={arrayHelpers => (
                <InputParametersView
                    arrayHelpers={arrayHelpers}
                    createNewElem={() => {
                        return {name: '', value: ''}
                    }}
                    header="Hyper Parameters"
                >
                    {formik.values.spec?.hyperParameters?.map((target: HyperParameter, index: number) => (
                            <ItemInputParametersView arrayHelpers={arrayHelpers} index={index}>
                                <OdahuTextField
                                    name={`spec.hyperParameters[${index}].name`}
                                    label="Name"
                                />
                                <OdahuTextField
                                    name={`spec.hyperParameters[${index}].value`}
                                    label="Value"
                                />
                            </ItemInputParametersView>
                        )
                    )}
                </InputParametersView>
            )}
        />
    );
};


function processHyperParamsBeforeSubmit(training: ModelTraining): ModelTraining {
    // Deep copy
    training = JSON.parse(JSON.stringify(training));
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

function processHyperParams(mp: ModelTraining): ModelTraining {
    if (mp.spec?.hyperParameters && typeof mp.spec.hyperParameters === "object") {
        mp.spec.hyperParameters = Object.entries(mp.spec.hyperParameters).map(([name, value]) => {
            return {name, value}
        });
    }

    return mp;
}

export function isHyperParameter(value: any): value is HyperParameter {
    return value?.hasOwnProperty('name') && value?.hasOwnProperty('value');
}

const EnvironmentVariablesSection: React.FC = () => {
    const formik = useFormikContext<ModelTraining>();

    return (
        <FieldArray
            name="spec.envs"
            render={arrayHelpers => (
                <InputParametersView
                    arrayHelpers={arrayHelpers}
                    header="Environment variables"
                    createNewElem={() => {
                        return {name: '', value: ''}
                    }}
                >
                    {formik.values.spec?.envs?.map((env, index) => (
                            <ItemInputParametersView arrayHelpers={arrayHelpers} index={index}>
                                <OdahuTextField
                                    name={`spec.envs.${index}.name`}
                                    label='Name'
                                    style={{minWidth: '40%', paddingRight: '5px'}}
                                />
                                <OdahuTextField
                                    name={`spec.envs.${index}.value`}
                                    label='Value'
                                    style={{minWidth: '40%'}}
                                />
                            </ItemInputParametersView>
                        )
                    )}
                </InputParametersView>
            )}
        />
    )
};

const SpecElements: React.FC = () => {
    return (
        <>
            <OdahuTextField
                name="spec.entrypoint"
                label='Entrypoint'
                description='Mlflow MLProject file can contains the list of entrypoints. You must choose one of these.'
            />
            <EnvironmentVariablesSection/>
            <GitSpecElements/>
            <HyperParametersSection/>
            <DataSection/>
            <ResourcesSpecElements gpu/>
        </>
    )
};

export interface EditableTrainingPageProps {
    training: ModelTraining;
    saveButtonClick: SaveButtonClick<ModelTraining>;
}

export const EditableTrainingPage: React.FC<EditableTrainingPageProps> = ({training, saveButtonClick}) => {
    return (
        <EditablePage
            entity={processHyperParams(training)}
            redirectURL={TrainingURLPagePrefix}
            title="Edit Training"
            schemas={{
                metadata: TrainingMetaSchema,
                spec: TrainingSchema,
            }}
            fields={{
                metadata: () => <MetadataElements/>,
                spec: () => <SpecElements/>,
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                review: training => <TrainingView training={training} status={false}/>
            }}
            processBeforeSubmit={processHyperParamsBeforeSubmit}
            saveButtonClick={saveButtonClick}
        />
    );
};

export interface NewTrainingPageProps {
    training?: ModelTraining;
}

export const NewTrainingPage: React.FC<NewTrainingPageProps> = ({training}) => {
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
            entity={{
                id: '',
                spec: Object.assign({
                    entrypoint: '',
                    toolchain: toolchainIDs[0],
                    data: [],
                    envs: [],
                    model: {name: '', version: ''},
                    vcsName: connectionIDs[0],
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
                }, processHyperParams(training ?? {})?.spec ?? {})
            }}
            redirectURL={TrainingURLPagePrefix}
            title="New Training"
            schemas={{
                metadata: TrainingMetaSchema,
                spec: TrainingSchema,
            }}
            fields={{
                metadata: () => <MetadataElements/>,
                spec: () => <SpecElements/>,
                review: training => <TrainingView training={training} status={false}/>
            }}
            processBeforeSubmit={processHyperParamsBeforeSubmit}
            saveButtonClick={new SaveButtonClick<ModelTraining>(
                createTrainingRequest,
                fetchAllTrainingRequest,
                "Model Training was created",
            )}
        />
    );
};

export const NewSimilarTrainingPage: React.FC<NewTrainingPageProps> = () => {
    const {id} = useParams();

    const trainingState = useSelector<ApplicationState, ModelTrainingState>(state => state.trainings);
    const training = trainingState.data[String(id)];

    return (
        <EditablePage
            entity={{
                id: '',
                spec: Object.assign({
                    entrypoint: '',
                    toolchain: '',
                    data: [],
                    envs: [],
                    model: {name: '', version: ''},
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
                }, processHyperParams(training).spec)
            }}
            redirectURL={TrainingURLPagePrefix}
            title="New Training"
            schemas={{
                metadata: TrainingMetaSchema,
                spec: TrainingSchema,
            }}
            fields={{
                metadata: () => <MetadataElements/>,
                spec: () => <SpecElements/>,
                review: training => <TrainingView training={training} status={false}/>
            }}
            processBeforeSubmit={processHyperParamsBeforeSubmit}
            saveButtonClick={new SaveButtonClick<ModelTraining>(
                createTrainingRequest,
                fetchAllTrainingRequest,
                "Model Training was created",
            )}
        />
    );
};
