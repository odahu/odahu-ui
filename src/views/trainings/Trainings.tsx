import React from "react";
import {Route, Switch} from "react-router-dom";
import {NewCloneTrainingPage, NewTrainingPage} from "./TrainingEditablePage";
import {TrainingPage} from "./TrainingPage";
import {TrainingTable} from "./TrainingTable";
import {TrainingURLs} from "./urls";
import {join} from "path";

export const Trainings: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <Switch>
                <Route exact path={TrainingURLs.Table} component={TrainingTable}/>
                <Route path={TrainingURLs.New}>
                    <NewTrainingPage/>
                </Route>
                <Route path={join(TrainingURLs.Page, ':id')}>
                    <TrainingPage/>
                </Route>
                <Route path={join(TrainingURLs.Clone, ':id')}>
                    <NewCloneTrainingPage/>
                </Route>
            </Switch>
        </div>
    )
};
