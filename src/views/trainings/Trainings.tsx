import React from "react";
import {Route, Switch} from "react-router-dom";
import {NewSimilarTrainingPage, NewTrainingPage, TrainingURLNewPrefix} from "./TrainingEditablePage";
import {TrainingPage, TrainingURLPagePrefix} from "./TrainingPage";
import {TrainingTable} from "./TrainingTable";

export const TrainingsURLPrefix = "/trainings";
export const TrainingURLSimilarPrefix = "/trainings/similar";

export const Trainings: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <Switch>
                <Route exact path={TrainingsURLPrefix} component={TrainingTable}/>
                <Route path={TrainingURLNewPrefix}>
                    <NewTrainingPage/>
                </Route>
                <Route path={`${TrainingURLPagePrefix}/:id`}>
                    <TrainingPage/>
                </Route>
                <Route path={`${TrainingURLSimilarPrefix}/:id`}>
                    <NewSimilarTrainingPage/>
                </Route>
            </Switch>
        </div>
    )
};
