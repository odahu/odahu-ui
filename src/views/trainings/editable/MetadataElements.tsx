import React from "react";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {ToolchainState} from "../../../store/toolchains/types";
import {ConnectionState} from "../../../store/connections/types";
import {ConnectionTypes} from "../../connections/types";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {FormikOdahuSelect} from "../../../components/OdahuSelect";
import {useFieldsStyles} from "../../../components/fields";
import { MuiThemeProvider } from "@material-ui/core";
import { asterisksStyle } from "../../common_styles/asterisks-theme";

export interface MetadataElementsProps {
    readonlyID?: boolean;
}

export const MetadataElements: React.FC<MetadataElementsProps> = ({readonlyID = false}) => {
    const classes = useFieldsStyles();

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
            <MuiThemeProvider theme={asterisksStyle}>
                <OdahuTextField
                    className={classes.editorField}
                    disabled={readonlyID}
                    name="id"
                    label='ID'
                    description="Unique value among all trainings"
                    required
                />
                <OdahuTextField
                    className={classes.editorField}
                    name="spec.model.name"
                    label='Model name'
                    description='Human-readable model name'
                    required
                />
                <OdahuTextField
                    className={classes.editorField}
                    name="spec.model.version"
                    label='Model version'
                    description='Human-readable model value'
                    required
                />
                <FormikOdahuSelect
                    className={classes.editorField}
                    name="spec.toolchain"
                    label="Toolchain"
                    options={toolchainIDs}
                    required
                />
                <FormikOdahuSelect
                    className={classes.editorField}
                    name="spec.outputConnection"
                    label="Output connection"
                    options={connectionIDs}
                    required
                />
            </MuiThemeProvider>
        </>
    )
};
