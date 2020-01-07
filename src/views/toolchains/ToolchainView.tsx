import React from 'react';
import {ParametersView} from "../../components/ParametersView";
import {TableParameterView} from "../../components/TablePrameterView";
import {ToolchainIntegration} from "../../models/odahuflow/ToolchainIntegration";

export interface ToolchainViewProps {
    toolchain: ToolchainIntegration;
}

export const ToolchainView: React.FC<ToolchainViewProps> = ({toolchain}) => {
    const params = [
        {name: "ID", elem: toolchain.id},
        {name: "Default image", elem: toolchain.spec?.defaultImage},
        {name: "Entrypoint", elem: toolchain.spec?.entrypoint},
        {name: "Environment variables", elem: (
                <TableParameterView
                    style={{maxWidth: '50%', minWidth: '30%'}}
                    headers={["Name", "Value"]}
                    values={Object.entries(toolchain.spec?.additionalEnvironments ?? {})}
                />
            )},
    ];

    return (
        <ParametersView params={params}/>
    )
};
