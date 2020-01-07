import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import {Button, Divider} from "@material-ui/core";
import React from "react";
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
            borderBottom: '1px solid'
        },
        title: {
            flex: '1 1 100%',
        },
        newItemButton: {
            marginRight: theme.spacing(1)
        },
        button: {
            textTransform: 'none',
            marginRight: '10px',
        },
        buttonIcon: {
            paddingRight: '5px',
        }
    }),
);

interface SelectedTableToolbarProps {
    numSelected: number;
    onDeleteButtonClick: () => void;
    onNewSimilarButtonClick: () => void;
}

const SelectedTableToolbar: React.FC<SelectedTableToolbarProps> = (
    {numSelected, onDeleteButtonClick, onNewSimilarButtonClick}
) => {
    const classes = useToolbarStyles();

    return (
        <>
            <Typography className={classes.title} color="inherit" variant="subtitle1">
                {numSelected} selected
            </Typography>
            {numSelected === 1 && (
                <Button
                    className={classes.button}
                    variant="outlined"
                    onClick={onNewSimilarButtonClick} aria-label="new"
                >
                    <FileCopyIcon className={classes.buttonIcon}/>
                    Clone
                </Button>
            )}
            <Button className={classes.button} variant="outlined" onClick={onDeleteButtonClick} aria-label="delete">
                <DeleteIcon className={classes.buttonIcon}/>
                Delete
            </Button>
        </>
    );
};

interface BaseReadonlyTableToolbarProps {
    readonly: true;
    tableTitle: string;
    onRefreshButtonClick: () => void;
}

interface BaseTableToolbarProps {
    readonly: false;
    tableTitle: string;
    onNewButtonClick: () => void;
    onNewSimilarButtonClick: () => void;
    onRefreshButtonClick: () => void;
}

const BaseTableToolbar: React.FC<BaseTableToolbarProps | BaseReadonlyTableToolbarProps> = (props) => {
    const classes = useToolbarStyles();

    return (
        <>
            <Typography className={classes.title} variant="h6">
                {props.tableTitle}
            </Typography>
            {!props.readonly && (
                <Button className={classes.button} variant="outlined" onClick={props.onNewButtonClick} aria-label="new">
                    <AddIcon className={classes.buttonIcon}/>
                    New
                </Button>
            )}
            <Button className={classes.button} variant="outlined" onClick={props.onRefreshButtonClick}
                    aria-label="refresh">
                <RefreshIcon className={classes.buttonIcon}/>
                Refresh
            </Button>
        </>
    )
};

export type EnhancedReadonlyTableToolbarProps = BaseReadonlyTableToolbarProps;
export type EnhancedTableToolbarProps = SelectedTableToolbarProps & BaseTableToolbarProps;

export const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps | EnhancedReadonlyTableToolbarProps> = (props) => {
    const classes = useToolbarStyles();

    return (
        <Toolbar
            className={classes.root}
        >
            {!props.readonly && props.numSelected > 0 ? (
                <SelectedTableToolbar {...props}/>
            ) : (
                <BaseTableToolbar {...props}/>
            )}
            <Divider/>
        </Toolbar>
    );
};
