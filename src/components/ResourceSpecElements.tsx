import React from "react";
import {Divider, Paper, Typography} from "@material-ui/core";
import {OdahuTextField} from "./OdahuTextField";
import {useFieldsStyles} from "./fields";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useResourcesStyles = makeStyles(() =>
    createStyles({
        content: {
            display: "grid",
            gridTemplateColumns: "50% 50%"
        }
    }),
);

export interface ResourcesSpecElementsProps {
    // Is GPU resources fields enabled
    gpu: boolean;
}

export const ResourcesSpecElements: React.FC<ResourcesSpecElementsProps> = ({gpu}) => {
    const classes = useFieldsStyles();
    const resClasses = useResourcesStyles();

    return (
        <Paper className={classes.editorField}>
            <Typography className={classes.paperHeader}>Resources</Typography>
            <p className={classes.helperText}>Compute resources for the training job</p>
            <Divider/>
            <div className={resClasses.content}>
                <OdahuTextField
                    name="spec.resources.requests.memory"
                    label='Memory Request'
                />
                <OdahuTextField
                    name="spec.resources.limits.memory"
                    label='Memory Limit'
                />
                <OdahuTextField
                    label='CPU Request'
                    name="spec.resources.requests.cpu"
                />
                <OdahuTextField
                    name="spec.resources.limits.cpu"
                    label='CPU Limit'
                />
                {gpu && (
                    <OdahuTextField
                        name="spec.resources.limits.gpu"
                        label='GPU Limit'
                    />
                )}
            </div>
        </Paper>
    )
};
