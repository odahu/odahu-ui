import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AppsIcon from "@material-ui/icons/Apps";
import {
    Card,
    CardActionArea,
    CardMedia,
    createStyles,
    Grid,
    makeStyles,
    Popover,
    Theme,
    Typography
} from "@material-ui/core";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConfigurationState} from "../../store/configuration/types";
import {ExternalUrl} from "../../models/odahuflow/ExternalUrl";
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

// TODO: Consider the proper default logo instead of Grafana
const defaultLogo = "/img/logo/grafana.png";

export const AppPopup: React.FC = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const configurationState = useSelector<ApplicationState, ConfigurationState>(state => state.configuration);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onExternalUrlClick = (externalUrl: ExternalUrl) => {
        // open an external URL in the new tab
        window.open(externalUrl.url, "_blank");

        handleClose();
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
                <AppsIcon/>
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
                <div style={{textAlign: 'center'}}>
                    <Typography variant="h6" component="h2">
                        ODAHU Components
                    </Typography>
                </div>
                <Grid container spacing={2} style={{width: "300px", margin: "10px", marginRight: '0px'}}>
                    {configurationState.data.common?.externalUrls
                        ?.map((externalUrl, i) => (
                            <Grid key={i} lg={4} xs={4} item>
                                <Card style={{boxShadow: 'none'}}
                                      onClick={() => {
                                          onExternalUrlClick(externalUrl)
                                      }}>
                                    <CardActionArea style={{textAlign: 'center'}}>
                                        <CardMedia
                                            style={{maxWidth: "60%", display: 'inline-block', minHeight: '50px'}}
                                            component="img"
                                            image={externalUrl.imageUrl ? externalUrl.imageUrl : defaultLogo}
                                        />
                                        <div>
                                            <Typography
                                                style={{width: '100%', wordWrap: 'break-word', fontSize: '12px'}}
                                            >
                                                {externalUrl.name}
                                            </Typography>
                                        </div>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </Popover>
        </div>
    )
};
