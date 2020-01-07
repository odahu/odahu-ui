import React from 'react';
import {useParams} from "react-router-dom";

import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ViewPage} from "../../components/ViewPage";
import {PackagerView} from "./PackagerView";
import {Editor} from "../../components/Editor";
import {PackagerState} from "../../store/packagers/types";

export const PackagerURLPagePrefix = "/packagers/item";

export const PackagerPage: React.FC = () => {
    // Parameter from URL
    const {id} = useParams();

    // Global state
    const packagerState = useSelector<ApplicationState, PackagerState>(state => state.packagers);
    // We keep all entities in global state. In the future, we should make http request if entity missed
    const packager = packagerState.data[String(id)];

    return (
        <ViewPage
            loading={packagerState.loading}
            notFound={!packager}
            tabHeaders={["View", "YAML"]}
            tabValues={[
                <PackagerView
                    key="view"
                    packager={packager}
                />,
                <Editor
                    key="yaml"
                    readonly={true}
                    entity={packager}
                    fileName={`${id}.packager.odahuflow.yaml`}
                />
            ]}
        />
    )
};
