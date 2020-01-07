import React from "react";
import {Route, Switch} from "react-router-dom";
import {PackagerTable} from "./PackagerTable";
import {PackagerPage, PackagerURLPagePrefix} from "./PackagerPage";

export const PackagerURLPrefix = "/packagers";

export const Packagers: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <Switch>
                <Route exact path={PackagerURLPrefix} component={PackagerTable}/>
                <Route path={`${PackagerURLPagePrefix}/:id`}>
                    <PackagerPage/>
                </Route>
            </Switch>
        </div>
    )
};
