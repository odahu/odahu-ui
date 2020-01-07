import React from "react";
import {Route, Switch} from "react-router-dom";
import {PackagingTable} from "./PackagingTable";
import {NewPackagingPage, PackagingURLNewPrefix} from "./PackagingEditablePage";
import {PackagingURLPagePrefix, PackagingViewPage} from "./PackagingViewPage";

export const PackagingsURLPrefix = "/packagings";

export const Packagings: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <Switch>
                <Route exact path={PackagingsURLPrefix} component={PackagingTable}/>
                <Route path={PackagingURLNewPrefix}>
                    <NewPackagingPage/>
                </Route>
                <Route path={`${PackagingURLPagePrefix}/:id`}>
                    <PackagingViewPage/>
                </Route>
            </Switch>
        </div>
    )
};
