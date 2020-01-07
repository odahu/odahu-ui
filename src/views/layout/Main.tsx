import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {SideBar} from "./SideBar";
import {TopBar} from "./TopBar";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import {DashboardURLPrefix, DashboardView} from "../dashboard/Dashbord";
import {Connections, ConnectionURLPrefix} from "../connections/Connections";
import {Trainings, TrainingsURLPrefix} from "../trainings/Trainings";
import {Packagings, PackagingsURLPrefix} from "../packagings/Packagings";
import {Deployments, DeploymentURLPrefix} from "../deployments/Deployment";
import {useDispatch} from "react-redux";
import {fetchAllConnectionRequest as fetchAllConnectionsRequest} from "../../store/connections/actions";
import {fetchRequest as fetchConfigurationRequest} from "../../store/configuration/actions";
import {Alert} from "../../components/Alert";
import {fetchAllDeploymentRequest} from "../../store/deployments/actions";
import {NotImplemented, NotImplementedURL} from "../../components/NotImplementedPage";
import {GlobalBackdrop} from "../../components/Backdrop";
import {fetchAllToolchainRequest} from "../../store/toolchains/actions";
import {fetchAllTrainingRequest} from "../../store/trainings/actions";
import {fetchAllPackagerRequest} from "../../store/packagers/actions";
import {fetchAllPackagingRequest} from "../../store/packaging/actions";
import {Toolchains, ToolchainsURLPrefix} from "../toolchains/Toolchains";
import {Packagers, PackagerURLPrefix} from "../packagers/Packagers";
import {hideBackdrop, showBackdrop} from "../../store/backdrop/actions";
import {showErrorAlert} from "../../store/alert/actions";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

export const MainLayout: React.FC = () => {
    const classes = useStyles();
    const [isSideBarOpened, setSideBarOpened] = React.useState(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const dispatch = useDispatch();

    const onTopBarButtonClick = () => {
        setSideBarOpened(!isSideBarOpened);
    };

    useEffect(() => {
        dispatch(showBackdrop());

        Promise.all([
            dispatch(fetchAllConnectionsRequest()),
            dispatch(fetchConfigurationRequest()),
            dispatch(fetchAllDeploymentRequest()),
            dispatch(fetchAllToolchainRequest()),
            dispatch(fetchAllTrainingRequest()),
            dispatch(fetchAllPackagerRequest()),
            dispatch(fetchAllPackagingRequest()),
        ]).catch(err => {
            dispatch(showErrorAlert("Error", String(err)));
        }).finally(() => {
            setLoading(false);
            dispatch(hideBackdrop());
        })
    }, []);

    if (loading) {
        return <GlobalBackdrop/>
    }

    return (
        <Router>
            <div className={classes.root}>
                <Alert/>
                <GlobalBackdrop/>
                <CssBaseline/>
                <TopBar
                    onTopBarButtonClick={onTopBarButtonClick}
                    isSideBarOpened={isSideBarOpened}
                />
                <SideBar isOpened={isSideBarOpened}/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <Route key={"/"} exact path={"/"}>
                            <Redirect to={DashboardURLPrefix}/>
                        </Route>
                        <Route key={DashboardURLPrefix} path={DashboardURLPrefix}>
                            <DashboardView/>
                        </Route>
                        <Route key={ConnectionURLPrefix} path={ConnectionURLPrefix}>
                            <Connections/>
                        </Route>
                        <Route key={TrainingsURLPrefix} path={TrainingsURLPrefix}>
                            <Trainings/>
                        </Route>
                        <Route key={PackagingsURLPrefix} path={PackagingsURLPrefix}>
                            <Packagings/>
                        </Route>
                        <Route key={DeploymentURLPrefix} path={DeploymentURLPrefix}>
                            <Deployments/>
                        </Route>
                        <Route key={ToolchainsURLPrefix} path={ToolchainsURLPrefix}>
                            <Toolchains/>
                        </Route>
                        <Route key={PackagerURLPrefix} path={PackagerURLPrefix}>
                            <Packagers/>
                        </Route>
                        <Route key={NotImplementedURL} path={NotImplementedURL}>
                            <NotImplemented/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

