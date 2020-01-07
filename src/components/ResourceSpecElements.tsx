import React from "react";
import {Paper, Typography} from "@material-ui/core";
import {OdahuTextField} from "./CustomTextField";
import {useFieldsStyles} from "./fields";

export interface ResourcesSpecElementsProps {
    // Is GPU resources fields enabled
    gpu: boolean;
}

export const ResourcesSpecElements: React.FC<ResourcesSpecElementsProps> = ({gpu}) => {
    const classes = useFieldsStyles();

    return (
        <Paper className={classes.fields} style={{maxWidth: '40%'}}>
            <Typography className={classes.paperHeader}>Resources</Typography>
            <p className={classes.helperText}>Compute resources for the training job</p>
            <OdahuTextField
                name="spec.resources.requests.memory"
                label='Memory Request'
                style={{maxWidth: '40%', minWidth: '40%'}}
            />
            <OdahuTextField
                name="spec.resources.limits.memory"
                label='Memory Limit'
                style={{maxWidth: '40%', minWidth: '40%'}}
            />
            <OdahuTextField
                label='CPU Request'
                name="spec.resources.requests.cpu"
                style={{maxWidth: '40%', minWidth: '40%'}}
            />
            <OdahuTextField
                name="spec.resources.limits.cpu"
                label='CPU Limit'
                style={{maxWidth: '40%', minWidth: '40%'}}
            />
            {gpu && (
                <>
                    <OdahuTextField
                        name="spec.resources.limits.gpu"
                        label='GPU Limit'
                        style={{maxWidth: '40%', minWidth: '40%'}}
                    />
                </>
            )}
        </Paper>
    )
};
