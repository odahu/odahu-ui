import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {createStyles, makeStyles, Popover, Theme} from "@material-ui/core";
import clsx from "clsx";

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

export interface TopBarPopupProps {
    id: any;
    image: any;
}

export const TopBarPopup: React.FC<TopBarPopupProps> = ({image, children, id}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

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
                id={id}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={appsButtonClassName}
            >
                {image}
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
                    {children}
                </div>
            </Popover>
        </div>
    )
};
