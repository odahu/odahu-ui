import React, { useEffect, useState } from "react";
import {Button, createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import {Documentation} from "./Documentation";
import {ConnectionDashboardPanel} from "../connections/ConnectionDashboardPanel";
import {TrainingDashboardPanel} from "../trainings/TrainingDashboardPanel";
import {PackagingDashboardPanel} from "../packagings/PackagingDashboardPanel";
import {DeploymentDashboardPanel} from "../deployments/DeploymentDashboardPanel";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Redirect } from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { fetchAllDeploymentRequest } from "../../store/deployments/actions";
import { fetchAllPackagingRequest } from "../../store/packaging/actions";
import { fetchAllConnectionRequest } from "../../store/connections/actions";
import { fetchAllTrainingRequest } from "../../store/trainings/actions";
import { showErrorAlert } from "../../store/alert/actions";
import { useDispatch } from "react-redux";

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
        button: {
            textTransform: 'none'
        },
        buttonIcon: {
            paddingRight: '5px',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
        },
        container: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '272px',
            padding: '7px 15px',
            fontSize: '16px',
            backgroundColor: '#fff',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
        },
        icon: {
            display: 'flex',
            marginRight: '16px'
        },
        doc: {
            position:'absolute',
            top: '38px',
            left: '0',
            zIndex: 1,
            width: '272px',
            boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px'
        }

    }),
);

const refreshPeriod = 10000;

export const DashboardView: React.FC = () => {
    const classes = useStyles();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const dispatch: any = useDispatch();
    let timerId: any;
    
    function refreshState() {
        Promise.all([
            dispatch(fetchAllConnectionRequest()),
            dispatch(fetchAllDeploymentRequest()),
            dispatch(fetchAllTrainingRequest()),
            dispatch(fetchAllPackagingRequest()),
        ]).catch(err => {
            dispatch(showErrorAlert("Error", String(err)));
        });
    }

    const onRefresh = () => {
        setRefresh(true);
        refreshState();
        timerId = null;
    }

    useEffect(() => {
        timerId = setTimeout(onRefresh, refreshPeriod);
        return () => clearTimeout(timerId);
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div onMouseEnter={() => setIsShow(true)} onMouseLeave={() => setIsShow(false)} className={classes.container}>
                    <div className={classes.icon}>
                        <AssignmentIcon/>
                    </div>
                    <div>
                        Getting Started
                    </div>
                    <div style={{display: 'flex', marginLeft: '30px'}}>{isShow ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}</div>
                    {isShow ? (
                        <div className={classes.doc}>
                            <Documentation />
                        </div>
                    ) : null}
                </div>
                <Button 
                    id="dashboardRefreshBtn"
                    aria-label="refresh" 
                    className={classes.button}
                    variant="outlined" 
                    onClick={onRefresh}>
                    <RefreshIcon className={classes.buttonIcon}/>
                    Refresh
                </Button>
            </div>
            {refresh ? <Redirect to={"/refresh"}></Redirect>: null}
                
            <Grid container spacing={4}>
                <Grid item>
                    <ConnectionDashboardPanel/>
                </Grid>
                <Grid item>
                    <TrainingDashboardPanel/>
                </Grid>
                <Grid item>
                    <PackagingDashboardPanel/>
                </Grid>
                <Grid item>
                    <DeploymentDashboardPanel/>
                </Grid>
            </Grid>
        </div>
    )
};
