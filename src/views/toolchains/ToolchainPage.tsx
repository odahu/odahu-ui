import React from 'react';
import {useParams} from "react-router-dom";

import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ViewPage} from "../../components/ViewPage";
import {ToolchainState} from "../../store/toolchains/types";
import {ToolchainView} from "./ToolchainView";
import {Editor} from "../../components/Editor";

const tabHeaders = ["View", "YAML"];

export const ToolchainPage: React.FC = () => {
    const {id} = useParams();

    const toolchainState = useSelector<ApplicationState, ToolchainState>(state => state.toolchains);
    const toolchain = toolchainState.data[String(id)];

    return (
        <ViewPage
            loading={toolchainState.loading}
            notFound={!toolchain}
            tabHeaders={tabHeaders}
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
