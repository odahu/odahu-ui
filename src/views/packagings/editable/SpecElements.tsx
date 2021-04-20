import React from "react";
import {FieldArray, useFormikContext} from "formik";
import {ModelPackaging} from "../../../models/odahuflow/ModelPackaging";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {ConnectionState} from "../../../store/connections/types";
import {PackagerState} from "../../../store/packagers/types";
import {InputParametersView, ItemInputParametersView} from "../../../components/InputParametersView";
import {FormikOdahuSelect} from "../../../components/OdahuSelect";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {ModelTrainingState} from "../../../store/trainings/types";
import {FormikOdahuAutocomplete} from "../../../components/OdahuAutocomplete";
import {ResourcesSpecElements} from "../../../components/ResourceSpecElements";
import {useFieldsStyles} from "../../../components/fields";

const Targets: React.FC = () => {
    const classes = useFieldsStyles();
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
                    className={classes.editorField}
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
                                    name={`spec.targets[${index}].name`}
                                    label="Name"
                                    options={targetNames}
                                />
                                <FormikOdahuSelect
                                    name={`spec.targets[${index}].connectionName`}
                                    label="Connection ID"
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
    const classes = useFieldsStyles();
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
                    className={classes.editorField}
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

export const SpecElements: React.FC = () => {
    const classes = useFieldsStyles();
    const trainingState = useSelector<ApplicationState, ModelTrainingState>(state => state.trainings);
    const trainingArtifacts = Object.values(trainingState.data)
        .filter(mt => mt.status?.state === "succeeded")
        .flatMap(mt => mt.status?.artifacts)
        .map(artifact => artifact?.artifactName);

    return (
        <>
            <FormikOdahuAutocomplete
                required
                className={classes.editorField}
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
