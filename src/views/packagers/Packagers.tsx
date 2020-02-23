import React from "react";
import {Route, Switch} from "react-router-dom";
import {PackagerTable} from "./PackagerTable";
import {PackagerPage} from "./PackagerPage";
import {PackagerURLs} from "./urls";
import {join} from "path";
import {useFieldsStyles} from "../../components/fields";

export const Packagers: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path={PackagerURLs.Table} component={PackagerTable}/>
                <Route path={join(PackagerURLs.Page, ':id')}>
                    <PackagerPage/>
                </Route>
            </Switch>
        </div>
    )
};
