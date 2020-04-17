import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AppPopup} from "./AppPopup";
import {UserPopup} from "./UserPopup";
import {VersionPopup} from "./VersionPopup";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
            '&:hover': {
                color: theme.palette.secondary.main,
            }
        },
        activeMenuButton: {
            marginRight: 36,
            color: theme.palette.secondary.main,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        header: {
            color: theme.palette.secondary.main,
        }
    }),
);

export interface TopBarProps {
    onTopBarButtonClick: () => void;
    isSideBarOpened: boolean;
}

export const TopBar: React.FC<TopBarProps> = (
    {onTopBarButtonClick, isSideBarOpened}
) => {
    const classes = useStyles();
    const menuClassName = clsx({
        [classes.activeMenuButton]: isSideBarOpened,
        [classes.menuButton]: !isSideBarOpened,
    });

    return (
        <AppBar
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onTopBarButtonClick}
                    edge="start"
                    className={menuClassName}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    className={classes.header}
                    variant="h6"
                    noWrap
                >
                    ODAHU
                </Typography>
                <div className={classes.content}/>
                <AppPopup/>
                <UserPopup/>
                <VersionPopup/>
            </Toolbar>
        </AppBar>
    )
};
