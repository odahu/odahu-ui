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


export interface ItemInputParametersViewProps {
    arrayHelpers: ArrayHelpers;
    index: number;
}

export const ItemInputParametersView: React.FC<ItemInputParametersViewProps> = ({arrayHelpers, index, children}) => (
    <ListItem style={{paddingLeft: '0px'}}>
        <ListItem style={{paddingLeft: '0px'}}>
            {children}
        </ListItem>
        <ListItemSecondaryAction style={{marginTop: '10px'}}>
            <IconButton onClick={() => {
                arrayHelpers.remove(index);
            }} edge="end" aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);

export interface InputParametersViewProps {
    arrayHelpers: ArrayHelpers;
    // If element is null or undefined then we skip pushing it to the state
    createNewElem: () => any;
    header: string;
    style?: CSSProperties;
    description?: string;
}

export const InputParametersView: React.FC<InputParametersViewProps> = (
    {
        arrayHelpers, header, style,
        description, createNewElem, children

    }
) => {
    const classes = useFieldsStyles();

    return (
        <Paper style={Object.assign(style ?? {}, {margin: "20px", minWidth: '40%', maxWidth: '40%'})}>
            <div style={{margin: '10px 10px 10px 10px', overflow: 'auto'}}>
                <Typography
                    style={{float: 'left', padding: '5px 0 0 10px'}}
                >
                    {header}
                </Typography>
                <Button
                    style={{float: 'right'}}
                    variant="outlined"
                    onClick={() => {
                        const element = createNewElem();

                        if (element) {
                            arrayHelpers.push(element);
                        }
                    }}
                >
                    Add
                </Button>
            </div>
            {!!description && (
                <p className={classes.helperText}>{description}</p>
            )}
            <Divider/>
            <List dense={true}>
                {typeof children === "function" ? children(arrayHelpers) : children}
            </List>
        </Paper>
    )
};
