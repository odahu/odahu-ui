import React from "react";
import {Route, Switch} from "react-router-dom";
import {TrainingIntegrationTable} from "./TrainingIntegrationTable";
import {TrainingIntegrationPage} from "./TrainingIntegrationPage";
import {useFieldsStyles} from "../../components/fields";
import {TrainingIntegrationURLs} from "./urls";
import {join} from "path";

export const TrainingIntegrations: React.FC = () => {
    const classes = useFieldsStyles();

    return (
        <div className={classes.root}>
            <Switch>
                <Route
                    exact
                    path={TrainingIntegrationURLs.Table}
                    component={TrainingIntegrationTable}
                />
                <Route
                    path={join(TrainingIntegrationURLs.Page, ':id')}
                >
                    <TrainingIntegrationPage/>
                </Route>
            </Switch>
        </div>
    )
};
