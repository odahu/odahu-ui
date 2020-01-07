import React from "react";
import {Route, Switch} from "react-router-dom";
import {DeploymentTable} from "./DeploymentTable";
import {DeploymentURLNewPrefix, NewDeploymentPage} from "./DeploymentEditablePage";
import {DeploymentURLPagePrefix, DeploymentViewPage} from "./DeploymentViewPage";

export const DeploymentURLPrefix = "/deployments";

export const Deployments: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <Switch>
                <Route exact path={DeploymentURLPrefix} component={DeploymentTable}/>
                <Route path={DeploymentURLNewPrefix}>
                    <NewDeploymentPage/>
                </Route>
                <Route path={`${DeploymentURLPagePrefix}/:id`}>
                    <DeploymentViewPage/>
                </Route>
            </Switch>
        </div>
    )
};
