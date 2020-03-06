import React from "react";
import {ConnectionTypes} from "./types";
import {ParametersView, ViewParam} from "../../components/ParametersView";
import {ConnectionViewProps} from "./ConnectionEditablePage";
import {connectionPluginsMapping} from "./plugins";
import {ExternalLink} from "../../components/ExternalLink";
import {humanDate} from "../../utils/date";

export const ConnectionView: React.FC<ConnectionViewProps> = (({connection, status}) => {
    const specTypeParameters = connectionPluginsMapping
        .get(connection.spec?.type as ConnectionTypes)?.readonlyViewParameters(connection) ?? [];
    const parameters: Array<ViewParam> = [
        {name: "ID", elem: connection.id},
        {name: "Type", elem: connection.spec?.type},
        {name: "Description", elem: connection.spec?.description},
        {
            name: "WEB UI Link", elem: connection.spec?.webUILink && (
                <ExternalLink url={connection.spec?.webUILink}/>
            )
        },
        {name: "URI", elem: connection.spec?.uri},
        ...specTypeParameters
    ];

    if (status){
        parameters.push(
            {name: "Created at", elem: humanDate(connection.status?.createdAt)},
            {name: "Updated at", elem: humanDate(connection.status?.updatedAt)},
        )
    }

    return (
        <ParametersView params={parameters}/>
    )
});
