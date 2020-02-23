import React from "react";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {ConnectionState} from "../../../store/connections/types";
import {ConnectionTypes} from "../../connections/types";
import {OdahuTextField} from "../../../components/CustomTextField";
import {FormikOdahuSelect} from "../../../components/OdahuSelect";

export const MetadataElements: React.FC = () => {
    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const dockerConnectionIDs = Object.values(connectionsState.data)
        .filter(conn => conn.spec?.type === ConnectionTypes.DOCKER || conn.spec?.type === ConnectionTypes.ECR)
        .map(conn => conn.id);

    return (
        <>
            <OdahuTextField
                name="id"
                label='ID'
                description="Unique value among all deployments"
            />
            <FormikOdahuSelect
                label="Image pull connection ID"
                name="spec.imagePullConnID"
                options={dockerConnectionIDs}
                description="Connection that describes access to the model Docker registry"
            />
        </>
    )
};
