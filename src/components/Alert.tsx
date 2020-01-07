import React from 'react';
import {createStyles, IconButton, makeStyles, Snackbar} from "@material-ui/core";
import LabAlert from "@material-ui/lab/Alert";
import {AlertTitle} from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch, useSelector} from "react-redux";
import {hideAlert} from "../store/alert/actions";
import {ApplicationState} from "../store";
import {AlertState} from "../store/alert/types";

const autoHideDuration = 6000;
const anchorOrigin = {
    horizontal: 'left' as const,
    vertical: 'bottom' as const
};

const useAlertStyles = makeStyles(() =>
    createStyles({
        alert: {
            minWidth: '400px',
            maxWidth: '400px',
        },
    })
);

/**
 * Global alerts.
 * Use the actions from the store/alert/action.ts file to control behaviour of the view.
 * For example:
 *    dispatch(showErrorAlert("Error", "Blabla"))
 * Alerts will hide after the timeout.
 */
export const Alert: React.FC = () => {
    const classes = useAlertStyles();
    const {severity, open, title, content} = useSelector<ApplicationState, AlertState>(state => state.alert);
    const dispatch = useDispatch();

    const handleOnClose = (event: React.SyntheticEvent<any>, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(hideAlert());
    };

    const onCloseButtonClick = () => {
        dispatch(hideAlert())
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            anchorOrigin={anchorOrigin}
            onClose={handleOnClose}
        >
            <LabAlert
                className={classes.alert}
                variant="filled"
                severity={severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={onCloseButtonClick}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }
            >
                <AlertTitle>{title}</AlertTitle>
                {content}
            </LabAlert>
        </Snackbar>
    );
};
