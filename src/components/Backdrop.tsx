import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {BackdropState} from "../store/backdrop/types";
import {Backdrop, CircularProgress} from "@material-ui/core";

const backDropStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

/**
 * Global backdrop.
 * Use the actions from the store/alert/backdrop.ts file to control behaviour of the view.
 * For example:
 *    dispatch(showBackdrop);
 *    setTimeout(dispatch, 1000, hideBackdrop);
 * The backdrop will not hide automatically, so make sure that you always hide it by yourself.
*/
export const GlobalBackdrop: React.FC = () => {
    const classes = backDropStyles();
    const backdropState = useSelector<ApplicationState, BackdropState>(state => state.backdrop);

    return (
        <Backdrop className={classes.backdrop} open={backdropState.open}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    )
};
