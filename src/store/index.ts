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
import {ToolchainState} from "./toolchains/types";
import {toolchainReducer} from "./toolchains/reducer";
import {PackagerState} from "./packagers/types";
import {packagerReducer} from "./packagers/reducer";
import {ModelPackagingState} from "./packaging/types";
import {packagingReducer} from "./packaging/reducer";

// Top level state
export interface ApplicationState {
    alert: AlertState;
    backdrop: BackdropState;
    connections: ConnectionState;
    deployments: ModelDeploymentState;
    configuration: ConfigurationState;
    trainings: ModelTrainingState;
    toolchains: ToolchainState;
    packagers: PackagerState;
    packagings: ModelPackagingState;
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
    toolchains: toolchainReducer,
    packagers: packagerReducer,
    packagings: packagingReducer,
});
