import React from 'react';
import {Connection} from "../../models/odahuflow/Connection";
import {createConnectionRequest, fetchAllConnectionRequest} from "../../store/connections/actions";
import {ConnectionTypes} from "./types";
import {EditablePage} from "../../components/EditablePage";
import {SaveButtonClick} from "../../components/actions";
import {useFormikContext} from "formik";
import {FormikOdahuSelect} from "../../components/OdahuSelect";
import {OdahuTextField} from "../../components/CustomTextField";
import * as Yup from "yup";
import {IDSchema} from "../../components/fields";
import {ConnectionSpec} from "../../models/odahuflow/ConnectionSpec";
import {ConnectionView} from "./ConnectionView";
import {connectionPluginsMapping} from "./plugins";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConnectionState} from "../../store/connections/types";
import {ConnectionURLs} from "./urls";

const allConnectionTypes = Object.values(ConnectionTypes);

const ConnectionSchemaType = Yup.string().oneOf(Object.values<string>(ConnectionTypes)).required();
const ConnectionMetaSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.object().shape({
        type: ConnectionSchemaType,
    }),
});

const ConnectionSchema = Yup.object().shape({
    id: IDSchema,
    spec: Yup.lazy((spec?: ConnectionSpec) => {
        const schemaFields = connectionPluginsMapping.get(spec?.type as ConnectionTypes)?.schemaFields ?? {};

        return Yup.object().shape(
            Object.assign({type: ConnectionSchemaType}, schemaFields)
        );
    }),
});

const defaultFields = {
    redirectURL: ConnectionURLs.Page,
    schemas: {
        metadata: ConnectionMetaSchema,
        spec: ConnectionSchema,
    },
    fields: {
        metadata: () => <MetadataElements/>,
        spec: () => <SpecElements/>,
        review: (connection: Connection) => <ConnectionView connection={connection}/>,
    },
    saveButtonClick: new SaveButtonClick<Connection>(
        createConnectionRequest,
        fetchAllConnectionRequest,
        "Connection was created",
    )
};

const SpecElements: React.FC = () => {
    const formik = useFormikContext<Connection>();

    const fields = connectionPluginsMapping.get(formik.values.spec?.type as ConnectionTypes)?.editableFields;
    return fields !== undefined ? fields : <p>Unexpected connection type</p>;
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
                options={allConnectionTypes}
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

export interface ConnectionViewProps {
    connection: Connection;
}

export interface EditableConnectionPageProps {
    connection: Connection;
    saveButtonClick: SaveButtonClick<Connection>;
}

export const EditableConnectionPage: React.FC<EditableConnectionPageProps> = ({connection, saveButtonClick}) => {
    return (
        <EditablePage
            {...defaultFields}
            title="Edit Connection"
            entity={connection}
            saveButtonClick={saveButtonClick}
        />
    );
};

export const NewConnectionPage: React.FC = () => {
    return (
        <EditablePage
            {...defaultFields}
            title="New Connection"
            entity={{id: '', spec: {type: ConnectionTypes.GIT}}}
        />
    );
};

export const NewCloneConnectionPage: React.FC = () => {
    const {id} = useParams();

    const connectionState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const connection = connectionState.data[String(id)];

    return (
        <EditablePage
            {...defaultFields}
            title="Clone Connection"
            entity={{
                id: '',
                spec: Object.assign({
                    type: ConnectionTypes.GIT
                }, connection.spec)
            }}
        />
    );
};
