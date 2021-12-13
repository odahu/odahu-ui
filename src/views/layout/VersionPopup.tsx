import React from "react";
import {Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConfigurationState} from "../../store/configuration/types";
import {TopBarPopup} from "../../components/TopBarPopup";
import InfoIcon from '@material-ui/icons/Info';

export const VersionPopup: React.FC = () => {
    const config = useSelector<ApplicationState, ConfigurationState>(state => state.configuration);

    return (
        <TopBarPopup
            id='versionBtn'
            image={<InfoIcon/>}
        >
            <Typography variant="body1" component="h6">
                ODAHU version: {config.data.common?.version}
            </Typography>
        </TopBarPopup>
    )
};
