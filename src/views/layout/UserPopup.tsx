import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {createStyles, makeStyles, Popover, Theme, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import clsx from "clsx";
import {UserState} from "../../store/user/types";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            order: 22,
        },
        container: {
            flexDirection: 'row',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '380px',
            padding: 0,
            margin: '20px',
        },
        appIcon: {
            '&:hover': {
                color: theme.palette.secondary.main,
            },
        },
        activeAppIcon: {
            color: theme.palette.secondary.main,
        },
    }),
);

export const UserPopup: React.FC = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const userState = useSelector<ApplicationState, UserState>(state => state.user);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const appsButtonClassName = clsx({
        [classes.activeAppIcon]: open,
        [classes.appIcon]: !open,
    });

    return (
        <div className={classes.root}>
            <IconButton
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={appsButtonClassName}
            >
                <AccountCircleIcon/>
            </IconButton>
            <Popover
                className={classes.container}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <div style={{textAlign: 'center', width: "300px", margin: "10px", marginRight: '0px'}}>
                    <Typography variant="h6" component="h4">
                        {userState.data.username}
                    </Typography>
                    <Typography variant="body1" component="h6">
                        {userState.data.email}
                    </Typography>
                </div>

            </Popover>
        </div>
    )
};
