import React from 'react';
import {useParams} from "react-router-dom";
import {ViewPage} from "../../components/ViewPage";
import {PackagerView} from "./PackagerView";
import {Editor} from "../../components/Editor";
import {useFetchingEntity} from "../../components/EntitiyFetching";
import {fetchPackagerRequest} from "../../store/packagers/actions";

const tabHeaders = ["View", "YAML"];

export const PackagerPage: React.FC = () => {
    const {id} = useParams();
    const {entity, loading, notFound} = useFetchingEntity(id as string, fetchPackagerRequest);

    return (
        <ViewPage
            loading={loading}
            notFound={notFound}
            tabHeaders={tabHeaders}
            tabValues={[
                <PackagerView
                    key="view"
                    packager={entity}
                    status={true}
                />,
                <Editor
                    key="yaml"
                    readonly={true}
                    entity={entity}
                    fileName={`${id}.packager.odahuflow.yaml`}
                />
            ]}
        />
    )
};
