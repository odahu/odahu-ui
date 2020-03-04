import React from "react";
import {EditablePage} from "../../components/EditablePage";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {PackagerState} from "../../store/packagers/types";
import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";
import {SaveButtonClick} from "../../components/actions";
import {PackagingView} from "./PackagingView";
import {createPackagingRequest, fetchAllPackagingRequest, fetchPackagingRequest} from "../../store/packaging/actions";
import {PackagingMetaSchema, PackagingSchema} from "./editable/schemas";
import {Argument, SpecElements} from "./editable/SpecElements";
import {MetadataElements} from "./editable/MetadataElements";
import {PackagingURLs} from "./urls";
import {ModelPackagingSpec} from "../../models/odahuflow/ModelPackagingSpec";
import {extractLastElement} from "../../utils";
import {addSuffixToID, deepCopy} from "../../utils/enities";
import {FetchingEntity} from "../../components/EntitiyFetching";

function defaultPackagingSpec(integrationName = ''): ModelPackagingSpec {
    return {
        artifactName: "",
        integrationName: integrationName,
        outputConnection: "",
        targets: [],
        arguments: [],
        resources: {
            requests: {
                cpu: '',
                gpu: '',
                memory: '',
            },
            limits: {
                cpu: '',
                gpu: '',
                memory: '',
            },
        }
    }
}

function processArgumentsBeforeSubmit(packaging: ModelPackaging): ModelPackaging {
    // Deep copy
    packaging = deepCopy(packaging);
    const packArguments: Argument[] = packaging.spec?.arguments ?? [];
    const realArguments: Record<string, string> = {};

    for (const argument of packArguments) {
        realArguments[argument.name] = argument.value;
    }

    if (packaging.spec?.arguments) {
        packaging.spec.arguments = realArguments;
    }

    return packaging;
}


export function isArgument(value: any): value is Argument {
    return value?.hasOwnProperty('name') && value?.hasOwnProperty('value');
}

function processArguments(packaging: ModelPackaging): ModelPackaging {
    // Deep copy
    packaging = deepCopy(packaging);

    if (packaging.spec?.arguments && typeof packaging.spec.arguments === "object") {
        packaging.spec.arguments = Object.entries(packaging.spec.arguments).map(([name, value]) => {
            return {name, value}
        });
    }

    return packaging;
}

export interface EditablePackagingPageProps {
    packaging: ModelPackaging;
    saveButtonClick: SaveButtonClick<ModelPackaging>;
}

const defaultFields = {
    redirectURL: PackagingURLs.Page,
    schemas: {
        metadata: PackagingMetaSchema,
        spec: PackagingSchema,
    },
    fields: {
        metadata: () => <MetadataElements/>,
        spec: () => <SpecElements/>,
        review: (packaging: ModelPackaging) => <PackagingView packaging={packaging} status={false}/>,
    },
    saveButtonClick: new SaveButtonClick<ModelPackaging>(
        createPackagingRequest,
        fetchAllPackagingRequest,
        "Model Packaging was created",
    ),
    processBeforeSubmit: processArgumentsBeforeSubmit,
};

export const EditablePackagingPage: React.FC<EditablePackagingPageProps> = ({packaging, saveButtonClick}) => {
    return (
        <EditablePage
            {...defaultFields}
            fields={{
                metadata: () => <MetadataElements readonlyID/>,
                spec: () => <SpecElements/>,
                review: (packaging: ModelPackaging) => <PackagingView packaging={packaging} status={false}/>,
            }}
            title="Edit Packaging"
            entity={processArguments(packaging)}
            saveButtonClick={saveButtonClick}
        />
    );

};

export const NewPackagingPage: React.FC = () => {
    const packagerState = useSelector<ApplicationState, PackagerState>(state => state.packagers);
    const packagerIDs = Object.values(packagerState.data).map(packager => packager.id);

    return (
        <EditablePage
            {...defaultFields}
            title="New Packaging"
            entity={{
                id: '',
                spec: defaultPackagingSpec(extractLastElement(packagerIDs, ''))
            }}
        />
    );
};


export const ClonePackagingPage: React.FC = () => {
    return (
        <FetchingEntity
            fetchAction={fetchPackagingRequest}
        >
            {
                (packaging: ModelPackaging) => (
                    <EditablePage
                        {...defaultFields}
                        title="Clone Packaging"
                        entity={{
                            id: addSuffixToID(packaging.id as string, '-clone'),
                            spec: Object.assign(
                                defaultPackagingSpec(),
                                processArguments(packaging).spec
                            ),
                        }}
                    />
                )
            }
        </FetchingEntity>
    );
};
