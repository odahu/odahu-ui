import React from 'react';
import {ParametersView, ViewParam} from "../../components/ParametersView";
import {TableParameterView} from "../../components/TablePrameterView";
import {ToolchainIntegration} from "../../models/odahuflow/ToolchainIntegration";
import {humanDate} from "../../utils/date";

export interface ToolchainViewProps {
    toolchain: ToolchainIntegration;
    status: boolean;
}

export const ToolchainView: React.FC<ToolchainViewProps> = ({toolchain, status}) => {
    const params: Array<ViewParam> = [
        {name: "ID", elem: toolchain.id},
    ];

    if (status) {
        params.push(
            {name: "Created at", elem: humanDate(toolchain.createdAt)},
            {name: "Updated at", elem: humanDate(toolchain.updatedAt)},
        )
    }

    params.push(
        {name: "Default image", elem: toolchain.spec?.defaultImage},
        {name: "Entrypoint", elem: toolchain.spec?.entrypoint},
        {
            name: "Environment variables", elem: (
                <TableParameterView
                    style={{maxWidth: '50%', minWidth: '30%'}}
                    headers={["Name", "Value"]}
                    values={Object.entries(toolchain.spec?.additionalEnvironments ?? {})}
                />
            )
        },
    );

    return (
        <ParametersView params={params}/>
    )
};
