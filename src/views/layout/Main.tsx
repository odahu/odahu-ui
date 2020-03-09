import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {SideBar} from "./SideBar";
import {TopBar} from "./TopBar";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import {DashboardURLPrefix, DashboardView} from "../dashboard/Dashbord";
import {Connections} from "../connections/Connections";
import {Trainings} from "../trainings/Trainings";
import {Packagings} from "../packagings/Packagings";
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
import {Toolchains} from "../toolchains/Toolchains";
import {Packagers} from "../packagers/Packagers";
import {hideBackdrop, showBackdrop} from "../../store/backdrop/actions";
import {showErrorAlert} from "../../store/alert/actions";
import {DeploymentURLs} from "../deployments/urls";
import {Deployments} from "../deployments/Deployment";
import {TrainingURLs} from "../trainings/urls";
import {ConnectionURLs} from "../connections/urls";
import {PackagerURLs} from "../packagers/urls";
import {ToolchainURLs} from "../toolchains/urls";
import {PackagingURLs} from "../packagings/urls";
import {fetchUserInfoRequest} from "../../store/user/actions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
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

// 1 minute
const defaultUpdatePeriod = 60000;

export const MainLayout: React.FC = () => {
    const classes = useStyles();
    const [isSideBarOpened, setSideBarOpened] = React.useState(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const dispatch: any = useDispatch();

    const onTopBarButtonClick = () => {
        setSideBarOpened(!isSideBarOpened);
    };

    function refreshState() {
        Promise.all([
            dispatch(fetchAllConnectionsRequest()),
            dispatch(fetchConfigurationRequest()),
            dispatch(fetchUserInfoRequest()),
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
    }

    useEffect(() => {
        dispatch(showBackdrop());

        setInterval(refreshState, defaultUpdatePeriod);
        refreshState();
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
                        <Route key={ConnectionURLs.Table} path={ConnectionURLs.Table}>
                            <Connections/>
                        </Route>
                        <Route key={TrainingURLs.Table} path={TrainingURLs.Table}>
                            <Trainings/>
                        </Route>
                        <Route key={PackagingURLs.Table} path={PackagingURLs.Table}>
                            <Packagings/>
                        </Route>
                        <Route key={DeploymentURLs.Table} path={DeploymentURLs.Table}>
                            <Deployments/>
                        </Route>
                        <Route key={ToolchainURLs.Table} path={ToolchainURLs.Table}>
                            <Toolchains/>
                        </Route>
                        <Route key={PackagerURLs.Table} path={PackagerURLs.Table}>
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

