import React from "react";
import {LoadingPage} from "./LoadingPage";
import {Box, List, ListItem, ListItemText, makeStyles, Theme} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
// @ts-ignore
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import {getServices} from "../configureStore";
import {DeployedModel} from "../models/service-catalog/DeployedModel";
import {ModelDeployment} from "../models/odahuflow/ModelDeployment";
import {showErrorAlert} from "../store/alert/actions";
import {useDispatch} from "react-redux";
import {NotFoundPage} from "./NotFoundView";


export interface PlayModelProps {
    deployment: ModelDeployment;

}
export const PlayModel: React.FC<PlayModelProps> = (props: PlayModelProps) => {

    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            display: "block",
        },
    }));
    const classes = useStyles()

    const [loading, setLoading] = React.useState(true)
    const [notFound, setNotFound] = React.useState(false)
    const [model, setModel] = React.useState<DeployedModel | null>(null)

    const dispatch: any = useDispatch();
    const modelService = getServices().modelService

    if (loading) {
        modelService.getInfo(props.deployment?.id as string).then(value => {
            setModel(value)
        }).catch(err => {
            dispatch(showErrorAlert("Unable to fetch model info", String(err)));
            setNotFound(true)
        }).finally(() => {
            setLoading(false)
        })
    }

    if (loading) {
        return <LoadingPage />
    }
    if (notFound) {
        return <NotFoundPage/>
    }

    // Parse swagger spec
    let swaggerRaw = atob(model?.servedModel?.swagger2?.raw ?? "")
    let swaggerSpec = null
    if (swaggerRaw !== "") {
        try {
            swaggerSpec = JSON.parse(swaggerRaw)
            if (process.env.NODE_ENV === "development") {
                swaggerSpec.schemes = ["http"]
            }
        }
        catch (err) {
            dispatch(showErrorAlert("Error while parsing swagger specification", String(err)));
        }
    }

    return <Box>
        <Accordion defaultExpanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Model Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List dense={true}>
                    <ListItem key='deploymentID'>
                        <ListItemText
                            primary={"Model Deployment ID"}
                            secondary={model?.deploymentID}
                        />
                    </ListItem>
                    <ListItem key='MLServer'>
                        <ListItemText
                            primary={"ML Server"}
                            secondary={model?.servedModel?.mlServer}
                        />
                    </ListItem>
                    {
                        Object.entries(model?.servedModel?.metadata?.others ?? {}).map (
                        ([key, value]) => <ListItem key={`others.${key}`}>
                                <ListItemText
                                    primary={key}
                                    secondary={value}
                                />
                            </ListItem>
                        )
                    }
                </List>
            </AccordionDetails>
        </Accordion>

        {swaggerSpec && <Accordion defaultExpanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>OpenAPI</Typography>
            </AccordionSummary>
             <AccordionDetails classes={classes}>
                <SwaggerUI spec={swaggerSpec}/>
            </AccordionDetails>
        </Accordion>}
    </Box>


}