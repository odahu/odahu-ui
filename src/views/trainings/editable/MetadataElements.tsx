import React from "react";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../store";
import {ToolchainState} from "../../../store/toolchains/types";
import {ConnectionState} from "../../../store/connections/types";
import {ConnectionTypes} from "../../connections/types";
import {OdahuTextField} from "../../../components/CustomTextField";
import {FormikOdahuSelect} from "../../../components/OdahuSelect";

export const MetadataElements: React.FC = () => {
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
                description="Unique value among all trainings"
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
