import React from "react";
import {Route, Switch} from "react-router-dom"
import {NewCloneConnectionPage, NewConnectionPage} from "./ConnectionEditablePage";
import {ConnectionViewPage} from "./ConnectionViewPage";
import {ConnectionTable} from "./ConnectionTable";
import {ConnectionURLs} from "./urls";
import {join} from "path";
import {useFieldsStyles} from "../../components/fields";

export const Connections: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path={ConnectionURLs.Table} component={ConnectionTable}/>
                <Route path={ConnectionURLs.New}>
                    <NewConnectionPage/>
                </Route>
                <Route path={join(ConnectionURLs.Page, ':id')}>
                    <ConnectionViewPage/>
                </Route>
                <Route path={join(ConnectionURLs.Clone, ':id')}>
                    <NewCloneConnectionPage/>
                </Route>
            </Switch>
        </div>
    )
};
