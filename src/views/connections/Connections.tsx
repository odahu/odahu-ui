import React from "react";
import {Route, Switch} from "react-router-dom"
import {ConnectionURLNewPrefix, NewConnectionPage} from "./ConnectionEditablePage";
import {ConnectionPageURLPrefix, ConnectionViewPage} from "./ConnectionViewPage";
import {ConnectionTable} from "./ConnectionTable";

export const ConnectionURLPrefix = "/connections";

export const Connections: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <Switch>
                <Route exact path={ConnectionURLPrefix} component={ConnectionTable}/>
                <Route path={ConnectionURLNewPrefix}>
                    <NewConnectionPage/>
                </Route>
                <Route path={`${ConnectionPageURLPrefix}/:id`}>
                    <ConnectionViewPage/>
                </Route>
            </Switch>
        </div>
    )
};
