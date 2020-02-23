import React from "react";
import {Route, Switch} from "react-router-dom";
import {PackagingTable} from "./PackagingTable";
import {ClonePackagingPage, NewPackagingPage} from "./PackagingEditablePage";
import {PackagingViewPage} from "./PackagingViewPage";
import {PackagingURLs} from "./urls";
import {join} from "path";
import {useFieldsStyles} from "../../components/fields";

export const Packagings: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <div className={classes.root}>
            <Switch>
                <Route
                    exact
                    path={PackagingURLs.Table}
                    component={PackagingTable}
                />
                <Route path={PackagingURLs.New}>
                    <NewPackagingPage/>
                </Route>
                <Route path={join(PackagingURLs.Page, ':id')}>
                    <PackagingViewPage/>
                </Route>
                <Route path={join(PackagingURLs.Clone, ':id')}>
                    <ClonePackagingPage/>
                </Route>
            </Switch>
        </div>
    )
};
