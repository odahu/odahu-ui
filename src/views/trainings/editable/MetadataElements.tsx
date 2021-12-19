import React from "react";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {TrainingIntegrationState} from "../../../store/training_integrations/types";
import {ConnectionState} from "../../../store/connections/types";
import {ConnectionTypes} from "../../connections/types";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {FormikOdahuSelect} from "../../../components/OdahuSelect";
import {useFieldsStyles} from "../../../components/fields";

export interface MetadataElementsProps {
    readonlyID?: boolean;
}

export const MetadataElements: React.FC<MetadataElementsProps> = ({readonlyID = false}) => {
    const classes = useFieldsStyles();

    const trainingIntegrationState = useSelector<ApplicationState, TrainingIntegrationState>(state => state.trainingIntegrations);
    const trainingIntegrationIDs = Object.values(trainingIntegrationState.data).map(trainingIntegration => trainingIntegration.id);

    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const connectionIDs = Object.values(connectionsState.data)
        .filter(conn => conn.spec?.type === ConnectionTypes.S3 ||
            conn.spec?.type === ConnectionTypes.GCS ||
            conn.spec?.type === ConnectionTypes.AZUREBLOB)
        .map(conn => conn.id);

    return (
        <>
            <OdahuTextField
                className={classes.editorField}
                disabled={readonlyID}
                name="id"
                label='ID'
                description="Unique value among all trainings"
            />
            <OdahuTextField
                className={classes.editorField}
                name="spec.model.name"
                label='Model name'
                description='Human-readable model name'
            />
            <OdahuTextField
                className={classes.editorField}
                name="spec.model.version"
                label='Model version'
                description='Human-readable model value'
            />
            <FormikOdahuSelect
                className={classes.editorField}
                name="spec.trainingIntegration"
                label="Training Integration"
                options={trainingIntegrationIDs}
            />
            <FormikOdahuSelect
                className={classes.editorField}
                name="spec.outputConnection"
                label="Output connection"
                options={connectionIDs}
            />
        </>
    )
};
