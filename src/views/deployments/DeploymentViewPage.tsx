import React, {useEffect} from 'react';
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
import {DeploymentURLs} from "./urls";
import {
    Box,
    List,
    ListItem,
    ListItemText, makeStyles,
    Paper, Theme
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {PlayModel} from "../../components/PlayModel";

export const DeploymentViewPage: React.FC = () => {
    const {id} = useParams();
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


    return (
        <ViewPage
            loading={loading}
            notFound={notFound}
            tabHeaders={["View", "Edit", "YAML", "Dashboard", "Play"]}
            baseUrl={baseUrl}
            tabValues={[
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
            ]}
        />
    )
};
