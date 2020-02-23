import React from "react";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {PackagerState} from "../../../store/packagers/types";
import {ConnectionState} from "../../../store/connections/types";
import {ConnectionTypes} from "../../connections/types";
import {OdahuTextField} from "../../../components/CustomTextField";
import {FormikOdahuSelect} from "../../../components/OdahuSelect";

export const MetadataElements: React.FC = () => {
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
