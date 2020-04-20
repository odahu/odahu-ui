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
                <Grid item sm={5} md={4} lg={3}>
                    <Documentation/>
                </Grid>
                <Grid item sm={5} md={4} lg={3}>
                    <ConnectionDashboardPanel/>
                </Grid>
                <Grid item sm={4} md={3} lg={2}>
                    <TrainingDashboardPanel/>
                </Grid>
                <Grid item sm={4} md={3} lg={2}>
                    <PackagingDashboardPanel/>
                </Grid>
                <Grid item sm={4} md={3} lg={2}>
                    <DeploymentDashboardPanel/>
                </Grid>
            </Grid>
        </div>
    )
};
