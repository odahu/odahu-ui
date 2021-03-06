import React from 'react';
import {ParametersView, ViewParam} from "../../components/ParametersView";
import {TableParameterView} from "../../components/TablePrameterView";
import {PackagingIntegration} from "../../models/odahuflow/PackagingIntegration";
import {extractParameters} from "./utils";
import {humanDate} from "../../utils/date";

export interface PackagerViewProps {
    packager: PackagingIntegration;
    status: boolean;
}

export const PackagerView: React.FC<PackagerViewProps> = ({packager, status}) => {
    const params: Array<ViewParam> = [
        {name: "ID", elem: packager.id},
    ];

    if (status) {
        params.push(
            {name: "Created at", elem: humanDate(packager.createdAt)},
            {name: "Updated at", elem: humanDate(packager.updatedAt)},
        )
    }

    params.push(
        {name: "Default image", elem: packager.spec?.defaultImage},
        {name: "Entrypoint", elem: packager.spec?.entrypoint},
        {
            name: "Targets",
            elem: (
                <TableParameterView
                    style={{maxWidth: '40%', minWidth: '30%'}}
                    headers={["Name", "Connection Types", "Required"]}
                    values={(packager.spec?.schema?.targets ?? []).map(
                        target => [
                            target.name,
                            target.connectionTypes?.join(),
                            String(target.required),
                        ]
                    )}
                />
            )
        },
        {
            name: "Arguments",
            elem: (
                <TableParameterView
                    style={{maxWidth: '60%', minWidth: '50%'}}
                    headers={["Name", "Type", "Default", "Description"]}
                    values={extractParameters(packager).map(
                        prop => [
                            prop.name,
                            prop.type,
                            String(prop.default),
                            prop.description,
                        ]
                    )}
                />
            )
        },
    );

    return (
        <ParametersView params={params}/>
    )
};
