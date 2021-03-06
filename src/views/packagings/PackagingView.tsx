import React from 'react';
import {ParametersView, ViewParam} from "../../components/ParametersView";
import {checkValuePresent, TableParameterView} from "../../components/TablePrameterView";
import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";
import {isArgument} from "./PackagingEditablePage";
import {humanDate} from "../../utils/date";

export interface PackagingViewProps {
    packaging: ModelPackaging;
    status: boolean;
}

export const PackagingView: React.FC<PackagingViewProps> = ({packaging, status}) => {
    const params: Array<ViewParam> = [
        {name: "ID", elem: packaging.id},
        {name: "Integration", elem: packaging.spec?.integrationName},
        {name: "Created at", elem: humanDate(packaging.createdAt)},
        {name: "Updated at", elem: humanDate(packaging.updatedAt)},
    ];

    if (status) {
        params.push(
            {name: 'State', elem: packaging.status?.state},
        )
    }

    params.push(
        {name: "Artifact name", elem: packaging.spec?.artifactName},
        {name: "Image", elem: packaging.spec?.image},
        {name: "Output Connection", elem: packaging.spec?.outputConnection},
        {name: "Memory requests", elem: packaging.spec?.resources?.requests?.memory},
        {name: "Memory limits", elem: packaging.spec?.resources?.limits?.memory},
        {name: "CPU requests", elem: packaging.spec?.resources?.requests?.cpu},
        {name: "CPU limits", elem: packaging.spec?.resources?.limits?.cpu},
        {
            name: "Targets", elem: checkValuePresent(packaging.spec?.targets) && (
                <TableParameterView
                    headers={["Name", "Connection ID"]}
                    values={packaging.spec?.targets?.map(target => [target.name, target.connectionName])}
                />
            )
        },
        {
            name: "Arguments", elem: checkValuePresent(packaging.spec?.arguments) && (
                <TableParameterView
                    headers={["Name", "Value"]}
                    values={Object.entries(packaging.spec?.arguments ?? {}).map(([key, value]) => {
                        if (isArgument(value)) {
                            return [value.name, value.value];
                        } else {
                            return [key, String(value)];
                        }
                    })}
                />
            )
        },
    );


    if (status) {
        params.push(
            {
                name: 'Results', elem: checkValuePresent(packaging.status?.results) && (
                    <TableParameterView
                        style={{maxWidth: '40%'}}
                        headers={["Name", "Value"]}
                        values={packaging.status?.results?.map(result => [
                            result.name, result.value,
                        ])}
                    />
                )
            },
        )
    }

    return (
        <ParametersView params={params}/>
    )
};
