import React from "react";
import {List, ListItem, ListItemText} from "@material-ui/core";

export interface ViewParam {
    name: string;
    elem: any;
}

export interface ParametersViewProp {
    params: Array<ViewParam>;
}

export const ParameterView: React.FC<ParametersViewProp> = (({params}) => {
    return (
        <List dense={true}>
            {
                params
                    .filter(({elem}) => elem !== null && elem !== undefined && elem !== '')
                    .map(({name, elem}) => (
                        <ListItem key={name}>
                            <ListItemText
                                primary={name}
                                secondary={elem}
                            />
                        </ListItem>
                    ))
            }
        </List>
    )
});
