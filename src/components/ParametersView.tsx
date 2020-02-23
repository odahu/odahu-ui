import React from "react";
import {List, ListItem, ListItemText} from "@material-ui/core";

const isElementEmpty: (elem: ViewParam) => boolean = ({elem}) => {
    return elem !== null && elem !== undefined && elem !== '';
};

export interface ViewParam {
    name: string;
    elem: any;
}

export interface ParametersViewProp {
    params: Array<ViewParam>;
}

/**
 * Read only list of an Odahu entity parameters
 */
export const ParametersView: React.FC<ParametersViewProp> = (({params}) => {
    return (
        <List dense={true}>
            {params.filter(isElementEmpty).map(({name, elem}) => (
                <ListItem key={name}>
                    <ListItemText
                        primary={name}
                        secondary={elem}
                    />
                </ListItem>
            ))}
        </List>
    )
});
