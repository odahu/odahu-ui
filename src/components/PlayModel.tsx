import React from "react";
import {LoadingPage} from "./LoadingPage";
import {Box, List, ListItem, ListItemText, makeStyles, Theme} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
// @ts-ignore
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"


export type ModelOpenAPI = Record<string, any>

export interface ModelMetadata  {
    modelName: string,
    modelVersion: string,
    modelDescription: string,
    modelServer: string,
    others: Record<string, string>
}

export interface ModelInfo {
    metadata: ModelMetadata,
    openAPI: ModelOpenAPI
}

const spec = {
    "swagger": "2.0",
    "info": {
        "description": "Wine Model REST API",
    },
    "schemes": [
        "http",
    ],
    "host": "",
    "basePath": "",
    "paths": {
        "/model/wine/api/model/info": {
            "get": {
                "consumes": [],
                "description": "Return a swagger info about model",
                "produces": ["application/json"],
                "responses": {"200": {"description": "Info", "type": "object"}},
                "summary": "Info",
                "tags": ["/model/wine, weight: 100%, mirror: False"]
            }
        },
        "/model/wine/api/model/invoke": {
            "post": {
                "consumes": ["application/json"],
                "description": "Execute prediction",
                "parameters": [{
                    "in": "body",
                    "name": "PredictionParameters",
                    "required": true,
                    "schema": {
                        "properties": {
                            "columns": {
                                "example": ["fixed acidity", "volatile acidity", "citric acid", "residual sugar", "chlorides", "free sulfur dioxide", "total sulfur dioxide", "density", "pH", "sulphates", "alcohol"],
                                "items": {"type": "string"},
                                "type": "array"
                            },
                            "data": {
                                "example": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                                "items": {"items": {"type": "number"}, "type": "array"},
                                "type": "array"
                            }
                        }, "type": "object"
                    }
                }],
                "produces": ["application/json"],
                "responses": {
                    "200": {
                        "description": "Results of prediction",
                        "name": "PredictionResponse",
                        "properties": {
                            "columns": {
                                "example": ["quality"],
                                "items": {"type": "string"},
                                "type": "array"
                            }, "prediction": {"example": [[0]], "items": {"type": "number"}, "type": "array"}
                        }
                    }, "type": "object"
                },
                "summary": "Prediction",
                "tags": ["/model/wine, weight: 100%, mirror: False"]
            }
        },
    }
}

export const PlayModel: React.FC = (props) => {

    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            display: "block",
        },
    }));
    const classes = useStyles()

    const [loading, setLoading] = React.useState(false)
    const [modelInfo, setModelInfo] = React.useState<ModelInfo | null>(null)

    if (modelInfo === null && !loading) {
        setLoading(true)
        setTimeout(() => {
            setModelInfo({
                metadata: {
                    modelName: "wine",
                    modelVersion: "1.0",
                    modelDescription: "Some descr",
                    modelServer: "Custom Image",
                    others: {
                        "MLFlow Url": "https://mlflow.org",
                        "OpenAPI Specification URL": "/api/model/info",
                    }
                },
                openAPI: spec
            })
            setLoading(false)
        }, 2000)
    }

    if (loading) {
        return <LoadingPage />
    }

    return <Box>
        <Accordion defaultExpanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Model Metadata</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List dense={true}>
                    <ListItem>
                        <ListItemText
                            primary={"Model Name"}
                            secondary={modelInfo?.metadata.modelName}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={"Model Version"}
                            secondary={modelInfo?.metadata.modelVersion}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={"Model Description"}
                            secondary={modelInfo?.metadata.modelDescription}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={"Model Server"}
                            secondary={modelInfo?.metadata.modelServer}
                        />
                    </ListItem>
                    {
                        Object.entries(modelInfo?.metadata.others ?? {}).map (
                        ([key, value]) => <ListItem>
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
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>OpenAPI</Typography>
            </AccordionSummary>
            <AccordionDetails classes={classes}>
                <SwaggerUI spec={modelInfo?.openAPI}/>
            </AccordionDetails>
        </Accordion>
    </Box>


}