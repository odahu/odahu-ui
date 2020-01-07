import React from 'react';
import {Connection} from "../../models/odahuflow/Connection";
import {ConnectionMetaSchema, ConnectionSchema, ConnectionView} from "./types/common";
import {ConnectionGCSStep} from "./types/gcs";
import {ConnectionS3Step} from "./types/s3";
import {ConnectionGitStep} from "./types/git";
import {createConnectionRequest, fetchAllConnectionRequest} from "../../store/connections/actions";
import {ConnectionTypes} from "./types";
import {ConnectionAzureBlobStep} from "./types/azureblob";
import {EditablePage} from "../../components/EditablePage";
import {SaveButtonClick} from "../../components/actions";
import {ConnectionDockerStep} from "./types/docker";
import {ConnectionECRStep} from "./types/ecr";
import {useFormikContext} from "formik";
import {FormikOdahuSelect} from "../../components/OdahuSelect";
import {OdahuTextField} from "../../components/CustomTextField";

export const ConnectionURLNewPrefix = "/connections/new";

const SpecElements: React.FC = () => {
    const formik = useFormikContext<Connection>();

    switch (formik.values.spec?.type) {
        case ConnectionTypes.GCS:
            return <ConnectionGCSStep/>;
        case ConnectionTypes.S3:
            return <ConnectionS3Step/>;
        case ConnectionTypes.GIT:
            return <ConnectionGitStep/>;
        case ConnectionTypes.AZUREBLOB:
            return <ConnectionAzureBlobStep/>;
        case ConnectionTypes.DOCKER:
            return <ConnectionDockerStep/>;
        case ConnectionTypes.ECR:
            return <ConnectionECRStep/>;
        default:
            return <p>Unexpected connection type</p>;
    }
};

const MetadataElements: React.FC = () => {
    return (
        <>
            <OdahuTextField
                name="id"
                label='ID'
                description="Unique value among all connections"
            />
            <FormikOdahuSelect
                name='spec.type'
                label="Type"
                defaultValue={ConnectionTypes.AZUREBLOB}
                options={Object.values(ConnectionTypes)}
            />
            <OdahuTextField
                name='spec.webUILink'
                label="WEB UI Link"
                description='Link to the web resource. For example, git repo or a gcp bucket'
            />
            <OdahuTextField
                name='spec.description'
                label="Description"
                multiline
                rows="2"
                variant="outlined"
            />
        </>
    )
};

export interface EditableConnectionPageProps {
    connection: Connection;
    saveButtonClick: SaveButtonClick<Connection>;
}

export const EditableConnectionPage: React.FC<EditableConnectionPageProps> = ({connection, saveButtonClick}) => {
    return (
        <EditablePage
            entity={connection}
            redirectURL="/connections/item"
            title="Edit Connection"
            schemas={{
                metadata: ConnectionMetaSchema,
                spec: ConnectionSchema,
            }}
            fields={{
                metadata: () => <MetadataElements/>,
                spec: () => <SpecElements/>,
                review: connection => <ConnectionView connection={connection}/>
            }}
            saveButtonClick={saveButtonClick}
        />
    );
};

export const NewConnectionPage: React.FC = () => {
    return (
        <EditablePage
            entity={{id: '', spec: {type: ConnectionTypes.GIT}}}
            redirectURL="/connections/item"
            title="New Connection"
            schemas={{
                metadata: ConnectionMetaSchema,
                spec: ConnectionSchema,
            }}
            fields={{
                metadata: () => <MetadataElements/>,
                spec: () => <SpecElements/>,
                review: connection => <ConnectionView connection={connection}/>
            }}
            saveButtonClick={new SaveButtonClick<Connection>(
                createConnectionRequest,
                fetchAllConnectionRequest,
                "Connection was created",
            )}
        />
    );
};
