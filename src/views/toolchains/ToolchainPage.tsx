import React from 'react';
import {useParams} from "react-router-dom";
import {ViewPage} from "../../components/ViewPage";
import {ToolchainView} from "./ToolchainView";
import {Editor} from "../../components/Editor";
import {useFetchingEntity} from "../../components/EntitiyFetching";
import {fetchToolchainRequest} from "../../store/toolchains/actions";

const tabHeaders = ["View", "YAML"];

export const ToolchainPage: React.FC = () => {
    const {id} = useParams();
    const {entity, loading, notFound} = useFetchingEntity(id as string, fetchToolchainRequest);

    return (
        <ViewPage
            loading={loading}
            notFound={notFound}
            tabHeaders={tabHeaders}
            tabValues={[
                <ToolchainView
                    key="view"
                    toolchain={entity}
                    status={true}
                />,
                <Editor
                    key="yaml"
                    readonly={true}
                    entity={entity}
                    fileName={`${id}.toolchain.odahuflow.yaml`}
                />
            ]}
        />
    )
};
