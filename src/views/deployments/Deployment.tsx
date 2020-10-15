import React from "react";
import {Route, Switch} from "react-router-dom";
import {DeploymentTable} from "./DeploymentTable";
import {CloneDeploymentPage, NewDeploymentPage, CreateFromPackagingPage} from "./DeploymentPages";
import {DeploymentViewPage} from "./DeploymentViewPage";
import {DeploymentURLs} from "./urls";
import {useFieldsStyles} from "../../components/fields";
import {join} from "path";

export const Deployments: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path={DeploymentURLs.Table} component={DeploymentTable}/>
                <Route path={DeploymentURLs.New}>
                    <NewDeploymentPage/>
                </Route>
                <Route path={join(DeploymentURLs.Page, ':id')}>
                    <DeploymentViewPage/>
                </Route>
                <Route path={join(DeploymentURLs.Clone, ':id')}>
                    <CloneDeploymentPage/>
                </Route>
                <Route path={join(DeploymentURLs.FromPackaging, ':id')}>
                    <CreateFromPackagingPage/>
                </Route>
            </Switch>
        </div>
    )
};
