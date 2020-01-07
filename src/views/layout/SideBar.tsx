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
import {ConnectionURLPrefix} from "../connections/Connections";
import {TrainingsURLPrefix} from "../trainings/Trainings";
import {PackagingsURLPrefix} from "../packagings/Packagings";
import {Link} from 'react-router-dom';
import {DeploymentURLPrefix} from "../deployments/Deployment";
import {useFieldsStyles} from "../../components/fields";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BuildIcon from '@material-ui/icons/Build';
import {PackagerURLPrefix} from "../packagers/Packagers";
import {ToolchainsURLPrefix} from "../toolchains/Toolchains";
import {
    useLocation
} from "react-router-dom";

const drawerWidth = 250;

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
        nested: {
            paddingLeft: theme.spacing(2),
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
                <ListItemIcon className={clsx(classes.sidebarItem,{
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
                    url={ConnectionURLPrefix}
                />
                <Divider/>
                <SideBarElement
                    icon={<FitnessCenterIcon/>}
                    heading='Trainings'
                    url={TrainingsURLPrefix}
                />
                <SideBarElement
                    icon={<BuildIcon/>}
                    heading='Toolchains'
                    url={ToolchainsURLPrefix}
                />
                <Divider/>
                <SideBarElement
                    icon={<WorkIcon/>}
                    heading='Packagings'
                    url={PackagingsURLPrefix}
                />
                <SideBarElement
                    icon={<AccountTreeIcon/>}
                    heading='Packagers'
                    url={PackagerURLPrefix}
                />
                <Divider/>
                <SideBarElement
                    icon={<CloudIcon/>}
                    heading='Deployments'
                    url={DeploymentURLPrefix}
                />
            </List>
            <Divider/>
        </Drawer>
    );
};
