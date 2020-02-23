import React from "react";
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import {GettingStarted} from "./GettingStarted";
import {CLI} from "./CLI";

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
                    <GettingStarted/>
                </Grid>
                <Grid item xs={6}>
                    <CLI/>
                </Grid>
            </Grid>
        </div>
    )
};
