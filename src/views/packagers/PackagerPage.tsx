import React from 'react';
import {useParams} from "react-router-dom";

import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ViewPage} from "../../components/ViewPage";
import {PackagerView} from "./PackagerView";
import {Editor} from "../../components/Editor";
import {PackagerState} from "../../store/packagers/types";

const tabHeaders = ["View", "YAML"];

export const PackagerPage: React.FC = () => {
    const {id} = useParams();

    const packagerState = useSelector<ApplicationState, PackagerState>(state => state.packagers);
    const packager = packagerState.data[String(id)];

    return (
        <ViewPage
            loading={packagerState.loading}
            notFound={!packager}
            tabHeaders={tabHeaders}
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
