import React from 'react';
import {useParams} from "react-router-dom";

import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ViewPage} from "../../components/ViewPage";
import {ToolchainState} from "../../store/toolchains/types";
import {ToolchainView} from "./ToolchainView";
import {Editor} from "../../components/Editor";

export const ToolchainURLPagePrefix = "/toolchains/item";

export const ToolchainPage: React.FC = () => {
    // Parameter from URL
    const {id} = useParams();

    // Global state
    const toolchainState = useSelector<ApplicationState, ToolchainState>(state => state.toolchains);
    // We keep all entities in global state. In the future, we should make http request if entity missed
    const toolchain = toolchainState.data[String(id)];

    return (
        <ViewPage
            loading={toolchainState.loading}
            notFound={!toolchain}
            tabHeaders={["View", "YAML"]}
            tabValues={[
                <ToolchainView
                    key="view"
                    toolchain={toolchain}
                />,
                <Editor
                    key="yaml"
                    readonly={true}
                    entity={toolchain}
                    fileName={`${id}.toolchain.odahuflow.yaml`}
                />
            ]}
        />
    )
};
