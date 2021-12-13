import React, {CSSProperties} from 'react';
import {
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    Paper,
    Typography
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {ArrayHelpers} from "formik";
import {useFieldsStyles} from "./fields";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import { normalizeId } from '../utils/normalizeId';

export const useItemInputStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: "20px",
            minWidth: '40%',
            maxWidth: '40%'
        },
        listItem: {
            paddingLeft: '0px',
        },
        itemContent: {
            display: "grid",
            gridTemplateColumns: "50% 50%",
            width: '100%'
        },
        listAction: {
            marginTop: '10px',
        },
        topBar: {
            margin: '10px 10px 10px 10px', overflow: 'auto'
        },
        topBarHeader: {
            float: 'left',
            padding: '5px 0 0 10px',
        },
        topBarButton: {
            float: 'right'
        }
    }),
);

export interface ItemInputParametersViewProps {
    arrayHelpers: ArrayHelpers;
    index: number;
}

export const ItemInputParametersView: React.FC<ItemInputParametersViewProps> = (
    {arrayHelpers, index, children}
) => {
    const classes = useItemInputStyles();

    function onDeleteItem() {
        arrayHelpers.remove(index);
    }

    return (
        <ListItem className={classes.listItem}>
            <ListItem className={classes.listItem}>
                <div className={classes.itemContent}>
                    {children}
                </div>
            </ListItem>
            <ListItemSecondaryAction
                className={classes.listAction}
            >
                <IconButton
                    onClick={onDeleteItem}
                    edge="end"
                    aria-label="delete"
                >
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export interface InputParametersViewProps {
    arrayHelpers: ArrayHelpers;
    // If element is null or undefined then we skip pushing it to the state
    createNewElem: () => any;
    header: string;
    style?: CSSProperties;
    description?: string;
    className?: string;
}

export const InputParametersView: React.FC<InputParametersViewProps> = (
    {
        className,
        arrayHelpers, header, style,
        description, createNewElem, children

    }
) => {
    const classes = useItemInputStyles();
    const fieldClasses = useFieldsStyles();

    const uniqueStringForId = normalizeId(header);

    const addButtonOnClick = () => {
        const element = createNewElem();

        if (element) {
            arrayHelpers.push(element);
        }
    };

    return (
        <Paper
            style={style}
            className={className}
        >
            <div className={classes.topBar}>
                <Typography
                    className={classes.topBarHeader}
                >
                    {header}
                </Typography>
                <Button
                    id={`AddBtn${uniqueStringForId}`}
                    className={classes.topBarButton}
                    variant="outlined"
                    onClick={addButtonOnClick}
                >
                    Add
                </Button>
            </div>
            {!!description && (
                <p
                    className={fieldClasses.helperText}
                >
                    {description}
                </p>
            )}
            <Divider/>
            <List dense={true}>
                {typeof children === "function" ? children(arrayHelpers) : children}
            </List>
        </Paper>
    )
};
