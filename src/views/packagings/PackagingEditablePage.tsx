import * as Yup from "yup";
import React from "react";
import {EditablePage} from "../../components/EditablePage";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConnectionState} from "../../store/connections/types";
import {ConnectionTypes} from "../connections/types";
import {FormikOdahuSelect} from "../../components/OdahuSelect";
import {PackagerState} from "../../store/packagers/types";
import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";
import {FieldArray, useFormikContext} from "formik";
import {InputParametersView, ItemInputParametersView} from "../../components/InputParametersView";
import {ResourcesSpecElements} from "../../components/ResourceSpecElements";
import {SaveButtonClick} from "../../components/actions";
import {PackagingView} from "./PackagingView";
import {createPackagingRequest, fetchAllPackagingRequest} from "../../store/packaging/actions";
import {PackagingURLPagePrefix} from "./PackagingViewPage";
import {IDSchema} from "../../components/fields";
import {OdahuTextField} from "../../components/CustomTextField";
import {FormikOdahuAutocomplete} from "../../components/OdahuAutocomplete";
import {ModelTrainingState} from "../../store/trainings/types";

export const PackagingURLNewPrefix = "/packagings/new";

const PackagingMetaSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        integrationName: Yup.string().required('Integration name is a required field'),
        outputConnection: Yup.string(),
    }),
});

// TODO: refactor
const PackagingSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        integrationName: Yup.string().required('Integration name is a required field'),
        outputConnection: Yup.string(),
        artifactName: Yup.string().required('Artifact name is a required field'),
        targets: Yup.array().of(
            Yup.object().shape({
                connectionName: Yup.string().required('Connection ID is a required field'),
                name: Yup.string().required('Target name is a required field'),
            }),
        ),
        arguments: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Connection ID is a required field'),
                value: Yup.string().required('Target name is a required field'),
            }),
        ),
    }),
});


const MetadataElements: React.FC = () => {
    const packagerState = useSelector<ApplicationState, PackagerState>(state => state.packagers);
    const packagerIDs = Object.values(packagerState.data).map(packager => packager.id);

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
                description='Unique value among all packagings'
            />
            <FormikOdahuSelect
                name="spec.outputConnection"
                label="Output Connection ID"
                options={connectionIDs}
                description='Bucket where the Trained Model Binary is stored'
            />
            <FormikOdahuSelect
                name="spec.integrationName"
                label="Integration"
                options={packagerIDs}
                defaultValue={packagerIDs[0]}
                description='Type of a packager'
            />
        </>
    )
};

const Targets: React.FC = () => {
    const formik = useFormikContext<ModelPackaging>();

    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const connectionIDs = Object.values(connectionsState.data).map(conn => conn.id);

    const packagerState = useSelector<ApplicationState, PackagerState>(state => state.packagers);
    const packagers = Object.values(packagerState.data)
        .filter(packager => packager.id === formik.values.spec?.integrationName);

    if (packagers.length !== 1) {
        return null;
    }

    const targetNames = packagers[0].spec?.schema?.targets?.map(target => target.name) ?? [];

    return (
        <FieldArray
            name="spec.targets"
            render={arrayHelpers => (
                <InputParametersView
                    description='List of connections for a packager'
                    arrayHelpers={arrayHelpers}
                    createNewElem={() => {
                        return {name: targetNames[0], connectionName: connectionIDs[0]}
                    }}
                    header="Targets"
                >
                    {formik.values.spec?.targets?.map((target, index) => (
                            <ItemInputParametersView arrayHelpers={arrayHelpers} index={index}>
                                <FormikOdahuSelect
                                    name={`spec.target[${index}].name`}
                                    label="Name"
                                    defaultValue={targetNames[0]}
                                    options={targetNames}
                                />
                                <FormikOdahuSelect
                                    name={`spec.target[${index}].connectionName`}
                                    label="Connection ID"
                                    defaultValue={connectionIDs[0]}
                                    options={connectionIDs}
                                />
                            </ItemInputParametersView>
                        )
                    )}
                </InputParametersView>
            )}
        />
    )
};

export interface Argument {
    name: string;
    value: string;
}

const Arguments: React.FC = () => {
    const formik = useFormikContext<ModelPackaging>();

    const packagerState = useSelector<ApplicationState, PackagerState>(state => state.packagers);
    const packagers = Object.values(packagerState.data)
        .filter(packager => packager.id === formik.values.spec?.integrationName);

    if (packagers.length !== 1) {
        return null;
    }

    const argumentNames = packagers[0].spec?.schema?.arguments?.properties?.map(prop => prop.name) ?? [];

    return (
        <FieldArray
            name="spec.arguments"
            render={arrayHelpers => (
                <InputParametersView
                    style={{maxWidth: '60%', minWidth: '30%'}}
                    arrayHelpers={arrayHelpers}
                    createNewElem={() => {
                        return {name: argumentNames[0], value: ''}
                    }}
                    header="Arguments"
                    description='Parameterizing of a packaging process'
                >
                    {formik.values.spec?.arguments?.map((target: Argument, index: number) => (
                            <ItemInputParametersView arrayHelpers={arrayHelpers} index={index}>
                                <FormikOdahuSelect
                                    style={{minWidth: '300px'}}
                                    name={`spec.arguments[${index}].name`}
                                    label="Name"
                                    options={argumentNames}
                                />
                                <OdahuTextField
                                    name={`spec.arguments[${index}].value`}
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

const SpecElements: React.FC = () => {
    const trainingState = useSelector<ApplicationState, ModelTrainingState>(state => state.trainings);
    const trainingArtifacts = Object.values(trainingState.data)
        .filter(mt => mt.status?.state === "succeeded")
        .flatMap(mt => mt.status?.artifacts)
        .map(artifact => artifact?.artifactName);

    return (
        <>
            <FormikOdahuAutocomplete
                name="spec.artifactName"
                label='Artifact'
                options={trainingArtifacts}
                description='Output training artifact name'
            />
            <Targets/>
            <Arguments/>
            <ResourcesSpecElements gpu={false}/>
        </>
    )
};

function processArgumentsBeforeSubmit(packaging: ModelPackaging): ModelPackaging {
    // Deep copy
    packaging = JSON.parse(JSON.stringify(packaging));
    const packArguments: Argument[] = packaging.spec?.arguments ?? [];
    const realArguments: Record<string, string> = {};

    for (const argument of packArguments) {
        realArguments[argument.name] = argument.value;
    }

    if (packaging.spec?.arguments) {
        packaging.spec.arguments = realArguments;
    }

    return packaging;
}


export function isArgument(value: any): value is Argument {
    return value?.hasOwnProperty('name') && value?.hasOwnProperty('value');
}

function processArguments(mp: ModelPackaging): ModelPackaging {
    if (mp.spec?.arguments && typeof mp.spec.arguments === "object") {
        mp.spec.arguments = Object.entries(mp.spec.arguments).map(([name, value]) => {return {name, value}});
    }

    return mp;
}

export interface EditablePackagingPageProps {
    packaging: ModelPackaging;
    saveButtonClick: SaveButtonClick<ModelPackaging>;
}

export const EditablePackagingPage: React.FC<EditablePackagingPageProps> = ({packaging, saveButtonClick}) => {
    return (
        <EditablePage
            entity={processArguments(packaging)}
            redirectURL={PackagingURLPagePrefix}
            title="Edit Packaging"
            schemas={{
                metadata: PackagingMetaSchema,
                spec: PackagingSchema,
            }}
            processBeforeSubmit={processArgumentsBeforeSubmit}
            fields={{
                metadata: () => <MetadataElements/>,
                spec: () => <SpecElements/>,
                review: packaging => <PackagingView packaging={packaging} status={false}/>
            }}
            saveButtonClick={saveButtonClick}
        />
    );
};

export const NewPackagingPage: React.FC = () => {
    const packagerState = useSelector<ApplicationState, PackagerState>(state => state.packagers);
    const packagerIDs = Object.values(packagerState.data).map(packager => packager.id);

    return (
        <EditablePage
            entity={{
                id: '',
                spec: {
                    artifactName: "",
                    integrationName: packagerIDs[packagerIDs.length - 1],
                    outputConnection: "",
                    targets: [],
                    arguments: [],
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
            }}
            redirectURL={PackagingURLPagePrefix}
            title="New Packaging"
            schemas={{
                metadata: PackagingMetaSchema,
                spec: PackagingSchema,
            }}
            fields={{
                metadata: () => <MetadataElements/>,
                spec: () => <SpecElements/>,
                review: packaging => <PackagingView packaging={packaging} status={false}/>
            }}
            processBeforeSubmit={processArgumentsBeforeSubmit}
            saveButtonClick={new SaveButtonClick<ModelPackaging>(
                createPackagingRequest,
                fetchAllPackagingRequest,
                "Model Packaging was created",
            )}
        />
    );
};
