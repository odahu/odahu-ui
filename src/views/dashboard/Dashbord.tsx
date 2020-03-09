import React from "react";
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import {Documentation} from "./Documentation";
import {ConnectionDashboardPanel} from "../connections/ConnectionDashboardPanel";
import {TrainingDashboardPanel} from "../trainings/TrainingDashboardPanel";
import {PackagingDashboardPanel} from "../packagings/PackagingDashboardPanel";
import {DeploymentDashboardPanel} from "../deployments/DeploymentDashboardPanel";

export const DashboardURLPrefix = "/dashboard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

export const DashboardView: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Documentation/>
                </Grid>
                <Grid item xs={3}>
                    <ConnectionDashboardPanel/>
                </Grid>
                <Grid item xs={3}>
                    <TrainingDashboardPanel/>
                </Grid>
                <Grid item xs={3}>
                    <PackagingDashboardPanel/>
                </Grid>
                <Grid item xs={3}>
                    <DeploymentDashboardPanel/>
                </Grid>
            </Grid>
        </div>
    )
};
