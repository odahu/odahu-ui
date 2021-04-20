import React, {useEffect} from "react";
import {fieldMargin, useFieldsStyles} from "../../../components/fields";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {ConnectionState} from "../../../store/connections/types";
import {ConnectionTypes} from "../../connections/types";
import {Divider, Paper, Typography} from "@material-ui/core";
import {FormikOdahuSelect} from "../../../components/OdahuSelect";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {FieldArray, getIn, useFormikContext} from "formik";
import {ModelTraining} from "../../../models/odahuflow/ModelTraining";
import {InputParametersView, ItemInputParametersView} from "../../../components/InputParametersView";
import {ResourcesSpecElements} from "../../../components/ResourceSpecElements";
import {createStyles, makeStyles} from "@material-ui/core/styles";

export const useTrainingClasses = makeStyles(() =>
    createStyles({
        gitContent: {
            display: "grid",
            gridTemplateColumns: "50% 50%",
        },
        gitWorkDir: {
            margin: `${fieldMargin} !important`,
            gridColumnStart: "1",
            gridColumnEnd: "3"
        },
    }),
);

const GitSpecElements: React.FC = () => {
    const classes = useFieldsStyles();
    const trainClasses = useTrainingClasses();

    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const vcsConnectionIDs = Object.values(connectionsState.data)
        .filter(conn => conn.spec?.type === ConnectionTypes.GIT)
        .map(conn => conn.id);

    const formik = useFormikContext();

    // If vcs reference is not selected then fill by default reference from selected vcs connection
    // or set "develop" in case if default reference in VCS is not filled
    useEffect(() => {
        const vcsName = getIn(formik.values, 'spec.vcsName');
        const reference = getIn(formik.values, 'spec.reference');
        if (!!vcsName && !reference ){
            const defaultReference = connectionsState.data[vcsName]?.spec?.reference ?? 'develop';
            formik.setFieldValue('spec.reference', defaultReference);
        }
    })

    return (
        <Paper className={classes.editorField}>
            <Typography className={classes.paperHeader}>GIT Settings</Typography>
            <p className={classes.helperText}>Model git repository options</p>
            <Divider/>
            <div className={trainClasses.gitContent}>
                <FormikOdahuSelect
                    required
                    name="spec.vcsName"
                    label="VCS ID"
                    options={vcsConnectionIDs}
                    description='A connection which describes credentials to a GIT repository'
                    onChange={ (e: any) => {
                        e.persist();
                        formik.handleChange(e);
                        formik.setFieldTouched("spec.vcsName", true, false);
                        formik.setFieldValue('spec.reference', '');
                    }}
                />
                <OdahuTextField
                    name="spec.reference"
                    label='Reference'
                    description='a branch, tag, or commit'
                />
                <OdahuTextField
                    className={trainClasses.gitWorkDir}
                    name="spec.workDir"
                    label={'Work dir'}
                    description='Relative model location'
                />
            </div>
        </Paper>
    )
};


const DataSection: React.FC = () => {
    const classes = useFieldsStyles();
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
                    className={classes.editorField}
                    arrayHelpers={arrayHelpers}
                    createNewElem={() => {
                        return {
                            connName: connectionIDs[0],
                            locaPath: '',
                            remotePath: ''
                        }
                    }}
                    header="Data section"
                >
                    {formik.values.spec?.data?.map((data, index) => (
                            <ItemInputParametersView arrayHelpers={arrayHelpers} index={index}>
                                <OdahuTextField
                                    name={`spec.data.${index}.localPath`}
                                    label='Target Path'
                                />
                                <OdahuTextField
                                    name={`spec.data.${index}.remotePath`}
                                    label='Source Path'
                                />
                                <FormikOdahuSelect
                                    name={`spec.data.${index}.connName`}
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

export interface HyperParameter {
    name: string;
    value: string;
}

const HyperParametersSection: React.FC = () => {
    const classes = useFieldsStyles();
    const formik = useFormikContext<ModelTraining>();

    return (
        <FieldArray
            name="spec.hyperParameters"
            render={arrayHelpers => (
                <InputParametersView
                    className={classes.editorField}
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
    const classes = useFieldsStyles();
    const formik = useFormikContext<ModelTraining>();

    return (
        <FieldArray
            name="spec.envs"
            render={arrayHelpers => (
                <InputParametersView
                    className={classes.editorField}
                    arrayHelpers={arrayHelpers}
                    header="Environment variables"
                    description="These environment variables will be propagated to the training script."
                    createNewElem={() => {
                        return {name: '', value: ''}
                    }}
                >
                    {formik.values.spec?.envs?.map((env, index) => (
                            <ItemInputParametersView arrayHelpers={arrayHelpers} index={index}>
                                <OdahuTextField
                                    name={`spec.envs.${index}.name`}
                                    label='Name'
                                />
                                <OdahuTextField
                                    name={`spec.envs.${index}.value`}
                                    label='Value'
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
    const classes = useFieldsStyles();

    return (
        <>
            <OdahuTextField
                required
                className={classes.editorField}
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
