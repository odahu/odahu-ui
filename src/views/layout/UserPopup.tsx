import React from "react";
import {Button, Divider, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {UserState} from "../../store/user/types";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {TopBarPopup} from "../../components/TopBarPopup";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {ConfigurationState} from "../../store/configuration/types";

export const useFieldsStyles = makeStyles(() =>
    createStyles({
        separator: {
            marginTop: '10px'
        },
    }),
);

export const UserPopup: React.FC = () => {
    const userState = useSelector<ApplicationState, UserState>(state => state.user);
    const classes = useFieldsStyles();

    const config = useSelector<ApplicationState, ConfigurationState>(state => state.configuration);

    const onSignOutButtonClick = () => {
        // redirect to the sign out url from current tab
        window.open(config.data.users?.signOutUrl, "_self");
    };

    return (
        <TopBarPopup
            image={<AccountCircleIcon/>}
        >
            <Typography variant="h6" component="h4">
                {userState.data.username}
            </Typography>
            <Typography variant="body1" component="h6">
                {userState.data.email}
            </Typography>
            <Divider className={classes.separator}/>
            <Button
                id="signOutBtn"
                className={classes.separator}
                variant="outlined"
                onClick={onSignOutButtonClick}
            >
                Sign out
            </Button>
        </TopBarPopup>
    )
};
