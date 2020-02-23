import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import WorkIcon from '@material-ui/icons/Work';
import CloudIcon from '@material-ui/icons/Cloud';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import {DashboardURLPrefix} from "../dashboard/Dashbord";
import {Link, useLocation} from 'react-router-dom';
import {useFieldsStyles} from "../../components/fields";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BuildIcon from '@material-ui/icons/Build';
import {DeploymentURLs} from "../deployments/urls";
import {TrainingURLs} from "../trainings/urls";
import {ConnectionURLs} from "../connections/urls";
import {PackagerURLs} from "../packagers/urls";
import {ToolchainURLs} from "../toolchains/urls";
import {PackagingURLs} from "../packagings/urls";

const drawerWidth = 250;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        sidebarItem: {
            marginLeft: '8px',
            color: theme.palette.secondary.light,
            '&:hover': {
                color: theme.palette.secondary.main,
            }
        },
        chosenSidebarItem: {
            color: theme.palette.secondary.main,
        },
    }),
);

interface SideBarElement {
    icon: React.ReactElement;
    heading: string;
    url: string;
}

const SideBarElement: React.FC<SideBarElement> = (
    {heading, icon, url, children}
) => {
    const fieldClasses = useFieldsStyles();
    const classes = useStyles();

    const location = useLocation();

    return (
        <Link
            key={heading}
            to={url}
            className={clsx(fieldClasses.cleanupLink, {
                [classes.chosenSidebarItem]: location.pathname.startsWith(url),
            })}
        >
            <ListItem button>
                <ListItemIcon className={clsx(classes.sidebarItem, {
                    [classes.chosenSidebarItem]: location.pathname.startsWith(url),
                })}>{icon}</ListItemIcon>
                <ListItemText primary={heading}/>
                {children}
            </ListItem>
        </Link>
    )
};

export interface SidebarProps {
    isOpened: boolean;
}

export const SideBar: React.FC<SidebarProps> = ({isOpened}) => {
    const classes = useStyles();

    const drawerClassName = clsx(classes.drawer, {
        [classes.drawerOpen]: isOpened,
        [classes.drawerClose]: !isOpened,
    });
    const drawerClasses = {
        paper: clsx({
            [classes.drawerOpen]: isOpened,
            [classes.drawerClose]: !isOpened,
        }),
    };

    return (
        <Drawer
            variant="permanent"
            className={drawerClassName}
            classes={drawerClasses}
        >
            <div className={classes.toolbar}/>
            <List>
                <SideBarElement
                    icon={<DashboardIcon/>}
                    heading='Dashboard'
                    url={DashboardURLPrefix}
                />
                <Divider/>
                <SideBarElement
                    icon={<SettingsInputComponentIcon/>}
                    heading='Connections'
                    url={ConnectionURLs.Table}
                />
                <Divider/>
                <SideBarElement
                    icon={<FitnessCenterIcon/>}
                    heading='Trainings'
                    url={TrainingURLs.Table}
                />
                <SideBarElement
                    icon={<BuildIcon/>}
                    heading='Toolchains'
                    url={ToolchainURLs.Table}
                />
                <Divider/>
                <SideBarElement
                    icon={<WorkIcon/>}
                    heading='Packagings'
                    url={PackagingURLs.Table}
                />
                <SideBarElement
                    icon={<AccountTreeIcon/>}
                    heading='Packagers'
                    url={PackagerURLs.Table}
                />
                <Divider/>
                <SideBarElement
                    icon={<CloudIcon/>}
                    heading='Deployments'
                    url={DeploymentURLs.Table}
                />
            </List>
            <Divider/>
        </Drawer>
    );
};
