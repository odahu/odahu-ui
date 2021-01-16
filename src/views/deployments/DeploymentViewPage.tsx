import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {Editor} from "../../components/Editor";
import {ViewPage} from "../../components/ViewPage";
import {SaveButtonClick} from "../../components/actions";
import {ModelDeployment} from "../../models/odahuflow/ModelDeployment";
import {
    editDeploymentRequest,
    fetchAllDeploymentRequest,
    fetchDeploymentRequest
} from "../../store/deployments/actions";
import {DeploymentView} from "./DeploymentView";
import {EditableDeploymentPage} from "./DeploymentPages";
import {useFetchingEntity} from "../../components/EntitiyFetching";
import {createDashboardURL, GrafanaDashboard} from "../../components/Dashboard";
import {createLogsURL, LogsDashboard} from "../../components/Dashboard";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {DeploymentURLs} from "./urls";
import {PlayModel} from "../../components/PlayModel";
import {createKibanaEnabledSelector} from "../../store/configuration/types";
 
export const DeploymentViewPage: React.FC = () => {
    const {id} = useParams();
    const kibanaEnabled = useSelector<ApplicationState, boolean>(createKibanaEnabledSelector())
    const {entity, loading, notFound, setEntity} = useFetchingEntity(id as string, fetchDeploymentRequest);
    const baseUrl = `${DeploymentURLs.Page}/${id}`
    const history = useHistory();
    const saveButtonClick = new SaveButtonClick<ModelDeployment>(
        editDeploymentRequest,
        fetchAllDeploymentRequest,
        "Model Deployment submitted",
        (md) => {
            setEntity(md)
            history.push(baseUrl)
        }
    );
    const  tabValues = kibanaEnabled ? [
              <DeploymentView
                  key="view"
                  deployment={entity}
                  status={true}
              />,
              <EditableDeploymentPage
                  key="page"
                  deployment={entity}
                  saveButtonClick={saveButtonClick}
              />,
              <Editor
                  key="yaml"
                  readonly={false}
                  entity={entity}
                  fileName={`${id}.deployment.odahuflow.yaml`}
                  saveButtonClick={saveButtonClick}
              />,
              <LogsDashboard
                 key="logs"
                 logsURL={createLogsURL(
                   "/kibana/app/kibana#/dashboard/7390fea0-437c-11eb-8a96-eb5403b48b6c",
                   {"ModelName": id}
                 )}
              />,
              <GrafanaDashboard
                  key="grafana"
                  dashboardURL={createDashboardURL(
                      "/grafana/d/AdyEtcSZk/model-deployments",
                      {workload: entity.status?.deployment}
                  )}
              />,
              <PlayModel
                  key="play"
                  deployment={entity}
              /> ]: [
              <DeploymentView
                key="view"
                deployment={entity}
                status={true}
              />,
              <EditableDeploymentPage
                  key="page"
                  deployment={entity}
                  saveButtonClick={saveButtonClick}
              />,
              <Editor
                  key="yaml"
                  readonly={false}
                  entity={entity}
                  fileName={`${id}.deployment.odahuflow.yaml`}
                  saveButtonClick={saveButtonClick}
              />,
              <GrafanaDashboard
                  key="grafana"
                  dashboardURL={createDashboardURL(
                      "/grafana/d/AdyEtcSZk/model-deployments",
                      {workload: entity.status?.deployment}
                  )}
              />,
              <PlayModel
                  key="play"
                  deployment={entity}
              />
    ]
    const tabHeaders = kibanaEnabled ? ["View", "Edit", "YAML", "logs", "Dashboard", "Play"] : ["View", "Edit", "YAML", "Dashboard", "Play"]

    return (
        <ViewPage
            loading={loading}
            notFound={notFound}
            tabHeaders={tabHeaders}
            baseUrl={baseUrl}
            tabValues={tabValues}
        />
    )
};
