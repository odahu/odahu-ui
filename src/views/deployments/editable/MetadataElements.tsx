import React from "react";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {ConnectionState} from "../../../store/connections/types";
import {ConnectionTypes} from "../../connections/types";
import {OdahuTextField} from "../../../components/OdahuTextField";
import {FormikOdahuSelect} from "../../../components/OdahuSelect";
import {useFieldsStyles} from "../../../components/fields";
import {MuiThemeProvider } from "@material-ui/core";
import {asterisksStyle} from '../../common_styles/asterisks-theme'

export interface MetadataElementsProps {
    readonlyID?: boolean;
}

export const MetadataElements: React.FC<MetadataElementsProps> = ({readonlyID = false}) => {
    const classes = useFieldsStyles();

    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const dockerConnectionIDs = Object.values(connectionsState.data)
        .filter(conn => conn.spec?.type === ConnectionTypes.DOCKER || conn.spec?.type === ConnectionTypes.ECR)
        .map(conn => conn.id);

    return (
        <>
          <MuiThemeProvider theme={asterisksStyle}>
            <OdahuTextField
                className={classes.editorField}
                disabled={readonlyID}
                name="id"
                label='ID'
                description="Unique value among all deployments"
                required
            />
            <FormikOdahuSelect
                className={classes.editorField}
                label="Image pull connection ID"
                name="spec.imagePullConnID"
                options={dockerConnectionIDs}
                description="Connection that describes access to the model Docker registry"
                required
            />
          </MuiThemeProvider>
        </>
    )
};
