import React from 'react';
import {useParams} from "react-router-dom";
import {ViewPage} from "../../components/ViewPage";
import {TrainingIntegrationView} from "./TrainingIntegrationView";
import {Editor} from "../../components/Editor";
import {useFetchingEntity} from "../../components/EntitiyFetching";
import {fetchTrainingIntegrationRequest} from "../../store/training_integrations/actions";
import {TrainingIntegrationURLs} from "./urls";

const tabHeaders = ["View", "YAML"];

export const TrainingIntegrationPage: React.FC = () => {
    const {id} = useParams();
    const {entity, loading, notFound} = useFetchingEntity(id as string, fetchTrainingIntegrationRequest);
    const baseUrl = `${TrainingIntegrationURLs.Page}/${id}`

    return (
        <ViewPage
            loading={loading}
            notFound={notFound}
            tabHeaders={tabHeaders}
            baseUrl={baseUrl}
            tabValues={[
                <TrainingIntegrationView
                    key="view"
                    trainingIntegration={entity}
                    status={true}
                />,
                <Editor
                    key="yaml"
                    readonly={true}
                    entity={entity}
                    fileName={`${id}.training_integration.odahuflow.yaml`}
                />
            ]}
        />
    )
};
