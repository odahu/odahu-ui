import React from "react";
import {Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {UserState} from "../../store/user/types";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {TopBarPopup} from "../../components/TopBarPopup";

export const UserPopup: React.FC = () => {
    const userState = useSelector<ApplicationState, UserState>(state => state.user);

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
        </TopBarPopup>
    )
};
