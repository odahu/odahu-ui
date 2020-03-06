import React from 'react';
import {ParametersView} from "../../components/ParametersView";
import {TableParameterView} from "../../components/TablePrameterView";
import {PackagingIntegration} from "../../models/odahuflow/PackagingIntegration";
import {extractParameters} from "./utils";
import {humanDate} from "../../utils/date";

export interface PackagerViewProps {
    packager: PackagingIntegration;
    status: boolean;
}

export const PackagerView: React.FC<PackagerViewProps> = ({packager, status}) => {
    const params = [
        {name: "ID", elem: packager.id},
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
    ];

    if (status){
        params.push(
            {name: "Created at", elem: humanDate(packager.status?.createdAt)},
            {name: "Updated at", elem: humanDate(packager.status?.updatedAt)},
        )
    }

    return (
        <ParametersView params={params}/>
    )
};
