import React from "react";
import {Route, Switch} from "react-router-dom";
import {ToolchainTable} from "./ToolchainTable";
import {ToolchainPage} from "./ToolchainPage";
import {useFieldsStyles} from "../../components/fields";
import {ToolchainURLs} from "./urls";
import {join} from "path";

export const Toolchains: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <div className={classes.root}>
            <Switch>
                <Route
                    exact
                    path={ToolchainURLs.Table}
                    component={ToolchainTable}
                />
                <Route
                    path={join(ToolchainURLs.Page, ':id')}
                >
                    <ToolchainPage/>
                </Route>
            </Switch>
        </div>
    )
};
