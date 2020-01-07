import React from "react";
import {Route, Switch} from "react-router-dom";
import {ToolchainTable} from "./ToolchainTable";
import {ToolchainPage, ToolchainURLPagePrefix} from "./ToolchainPage";

export const ToolchainsURLPrefix = "/toolchains";

export const Toolchains: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <Switch>
                <Route exact path={ToolchainsURLPrefix} component={ToolchainTable}/>
                <Route path={`${ToolchainURLPagePrefix}/:id`}>
                    <ToolchainPage/>
                </Route>
            </Switch>
        </div>
    )
};
