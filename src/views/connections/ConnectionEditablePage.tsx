import React from 'react';
import {Connection} from "../../models/odahuflow/Connection";
import {
    createConnectionRequest,
    fetchAllConnectionRequest,
    fetchConnectionRequest
} from "../../store/connections/actions";
import {ConnectionTypes} from "./types";
import {EditablePage} from "../../components/EditablePage";
import {SaveButtonClick} from "../../components/actions";
import {useFormikContext} from "formik";
import {FormikOdahuSelect} from "../../components/OdahuSelect";
import {OdahuTextField} from "../../components/OdahuTextField";
import * as Yup from "yup";
import {IDSchema, useFieldsStyles} from "../../components/fields";
import {ConnectionSpec} from "../../models/odahuflow/ConnectionSpec";
import {ConnectionView} from "./ConnectionView";
import {connectionPluginsMapping} from "./plugins";
import {ConnectionURLs} from "./urls";
import {FetchingEntity} from "../../components/EntitiyFetching";
import {addSuffixToID} from "../../utils/enities";
import {useHistory} from "react-router-dom";

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
    schemas: {
        metadata: ConnectionMetaSchema,
        spec: ConnectionSchema,
    },
    fields: {
        metadata: () => <MetadataElements/>,
        spec: () => <SpecElements/>,
        review: (connection: Connection) => <ConnectionView connection={connection} status={false}/>,
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

interface MetadataElementsPros {
    readonlyID?: boolean;
}

const MetadataElements: React.FC<MetadataElementsPros> = ({readonlyID}) => {
    const classes = useFieldsStyles();

    return (
        <>
            <OdahuTextField
                className={classes.editorField}
                disabled={readonlyID}
                name="id"
                label='ID'
                description="Unique value among all connections"
            />
            <FormikOdahuSelect
                className={classes.editorField}
                name='spec.type'
                label="Type"
                options={allConnectionTypes}
            />
            <OdahuTextField
                className={classes.editorField}
                name='spec.webUILink'
                label="WEB UI Link"
                description='Link to the web resource. For example, git repo or a gcp bucket'
            />
            <OdahuTextField
                className={classes.editorField}
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
    status: boolean;
}

export interface EditableConnectionPageProps {
    connection: Connection;
    saveButtonClick: SaveButtonClick<Connection>;
}

export const EditableConnectionPage: React.FC<EditableConnectionPageProps> = ({connection, saveButtonClick}) => {
    return (
        <EditablePage
            {...defaultFields}
            fields={{
                metadata: () => <MetadataElements readonlyID/>,
                spec: () => <SpecElements/>,
                review: (connection: Connection) => <ConnectionView connection={connection} status={false}/>,
            }}
            title="Edit Connection"
            entity={connection}
            saveButtonClick={saveButtonClick}
        />
    );
};

export const NewConnectionPage: React.FC = () => {

    const history = useHistory()
    const btn = new SaveButtonClick<Connection>(
        createConnectionRequest,
        fetchAllConnectionRequest,
        "Connection was created",
        (entity) => {
            const redirectTo = `${ConnectionURLs.Page}/${entity.id}`
            history.push(redirectTo)
        }
    )

    return (
        <EditablePage
            {...defaultFields}
            saveButtonClick={btn}
            title="New Connection"
            entity={{id: '', spec: {type: ConnectionTypes.GIT}}}
        />
    );
};

export const NewCloneConnectionPage: React.FC = () => {

    const history = useHistory()
    const btn = new SaveButtonClick<Connection>(
        createConnectionRequest,
        fetchAllConnectionRequest,
        "Connection was created",
        (entity) => {
            const redirectTo = `${ConnectionURLs.Page}/${entity.id}`
            history.push(redirectTo)
        }
    )

    return (
        <FetchingEntity
            fetchAction={fetchConnectionRequest}
        >
            {
                (connection: Connection) => (
                    <EditablePage
                        {...defaultFields}
                        saveButtonClick={btn}
                        title="Clone Connection"
                        entity={{
                            id: addSuffixToID(connection.id as string, '-clone'),
                            spec: Object.assign({
                                type: ConnectionTypes.GIT
                            }, connection.spec)
                        }}
                    />
                )
            }
        </FetchingEntity>
    );
};
