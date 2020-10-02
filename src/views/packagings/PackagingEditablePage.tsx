import React from "react";
import {EditablePage} from "../../components/EditablePage";
import {useSelector} from "react-redux";
import {packagerIDsSelector} from "../../store/packagers/types";
import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";
import {SaveButtonClick} from "../../components/actions";
import {PackagingView} from "./PackagingView";
import {createPackagingRequest, fetchAllPackagingRequest, fetchPackagingRequest} from "../../store/packaging/actions";
import {PackagingMetaSchema, PackagingSchema} from "./editable/schemas";
import {Argument, SpecElements} from "./editable/SpecElements";
import {MetadataElements} from "./editable/MetadataElements";
import {PackagingURLs} from "./urls";
import {extractLastElement} from "../../utils";
import {addSuffixToID, deepCopy} from "../../utils/enities";
import {FetchingEntity} from "../../components/EntitiyFetching";
import {
    defaultPackagingOutputConnection,
    defaultPackagingResourcesSelector
} from "../../store/configuration/types";
import {useHistory} from "react-router-dom";
import {ModelTraining} from "../../models/odahuflow/ModelTraining";
import {fetchTrainingRequest} from "../../store/trainings/actions";
import {createPackagingSpecFromTraining} from "../../utils/basedCreating";
import {defaultPackagingSpec} from "../../utils/defaultEntities";

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

    const packagerIDs = useSelector(packagerIDsSelector);
    const outputConnection = useSelector(defaultPackagingOutputConnection);
    const defaultResources = useSelector(defaultPackagingResourcesSelector);


    const history = useHistory()
    const btn = new SaveButtonClick<ModelPackaging>(
        createPackagingRequest,
        fetchAllPackagingRequest,
        "Packaging was created",
        (entity) => {
            const redirectTo = `${PackagingURLs.Page}/${entity.id}`
            history.push(redirectTo)
        }
    )

    return (
        <EditablePage
            {...defaultFields}
            saveButtonClick={btn}
            title="New Packaging"
            entity={{
                id: '',
                spec: defaultPackagingSpec({
                    integrationName: extractLastElement(packagerIDs, ''),
                    resources: defaultResources,
                    outputConnection: outputConnection,
                })
            }}
        />
    );
};


export const ClonePackagingPage: React.FC = () => {

    const history = useHistory()
    const btn = new SaveButtonClick<ModelPackaging>(
        createPackagingRequest,
        fetchAllPackagingRequest,
        "Packaging was created",
        (entity) => {
            const redirectTo = `${PackagingURLs.Page}/${entity.id}`
            history.push(redirectTo)
        }
    )

    return (
        <FetchingEntity
            fetchAction={fetchPackagingRequest}
        >
            {
                (packaging: ModelPackaging) => (
                    <EditablePage
                        {...defaultFields}
                        saveButtonClick={btn}
                        title="Clone Packaging"
                        entity={{
                            id: addSuffixToID(packaging.id as string, '-clone'),
                            spec: defaultPackagingSpec(processArguments(packaging).spec),
                        }}
                    />
                )
            }
        </FetchingEntity>
    );
};

export const CreateFromTrainingPage: React.FC = () => {

    const packagerIDs = useSelector(packagerIDsSelector);
    const defaultResources = useSelector(defaultPackagingResourcesSelector);

    return (
        <FetchingEntity
            fetchAction={fetchTrainingRequest}
        >
            {
                (training: ModelTraining) => {
                    return <EditablePage
                        {...defaultFields}
                        title="Create from Training"
                        entity={{
                            id: `${training.id}-pack`,
                            spec: {
                                ...createPackagingSpecFromTraining(training),
                                resources: defaultResources,
                                integrationName: extractLastElement(packagerIDs, ''),
                            }
                        } as ModelPackaging}
                    />
                }
            }
        </FetchingEntity>
    );
};
