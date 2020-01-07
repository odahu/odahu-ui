import React from "react";
import {useFieldsStyles} from "../../../components/fields";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {ConnectionState} from "../../../store/connections/types";
import {ConnectionTypes} from "../../connections/types";
import {Paper, Typography} from "@material-ui/core";
import {FormikOdahuSelect} from "../../../components/OdahuSelect";
import {OdahuTextField} from "../../../components/CustomTextField";
import {FieldArray, useFormikContext} from "formik";
import {ModelTraining} from "../../../models/odahuflow/ModelTraining";
import {InputParametersView, ItemInputParametersView} from "../../../components/InputParametersView";
import {ResourcesSpecElements} from "../../../components/ResourceSpecElements";

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

export const SpecElements: React.FC = () => {
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
