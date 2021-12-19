import {ConnectionState} from "./connections/types";
import {AnyAction, combineReducers} from "redux";
import {connectionReducer} from "./connections/reducer";
import {ThunkAction} from "redux-thunk";
import {Services} from "../services";
import {ConfigurationState} from "./configuration/types";
import {configurationReducer} from "./configuration/reducer";
import {alertReducer} from "./alert/reducer";
import {AlertState} from "./alert/types";
import {deploymentReducer} from "./deployments/reducer";
import {ModelDeploymentState} from "./deployments/types";
import {ModelTrainingState} from "./trainings/types";
import {trainingReducer} from "./trainings/reducer";
import {backdropReducer} from "./backdrop/reducer";
import {BackdropState} from "./backdrop/types";
import {TrainingIntegrationState} from "./training_integrations/types";
import {trainingIntegrationReducer} from "./training_integrations/reducer";
import {PackagerState} from "./packagers/types";
import {packagerReducer} from "./packagers/reducer";
import {ModelPackagingState} from "./packaging/types";
import {packagingReducer} from "./packaging/reducer";
import {UserState} from "./user/types";
import {userReducer} from "./user/reducer";

// Top level state
export interface ApplicationState {
    alert: AlertState;
    backdrop: BackdropState;
    connections: ConnectionState;
    deployments: ModelDeploymentState;
    configuration: ConfigurationState;
    trainings: ModelTrainingState;
    trainingIntegrations: TrainingIntegrationState;
    packagers: PackagerState;
    packagings: ModelPackagingState;
    user: UserState;
}

// Helper thunk types
export type AsyncAction<R = void> = ThunkAction<R, ApplicationState, Services, AnyAction>

// Root reducer
export const createRootReducer = combineReducers({
    alert: alertReducer,
    backdrop: backdropReducer,
    connections: connectionReducer,
    deployments: deploymentReducer,
    configuration: configurationReducer,
    trainings: trainingReducer,
    trainingIntegrations: trainingIntegrationReducer,
    packagers: packagerReducer,
    packagings: packagingReducer,
    user: userReducer,
});
