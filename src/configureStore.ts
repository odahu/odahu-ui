import {applyMiddleware, createStore, Store} from "redux";
import {ApplicationState, createRootReducer} from "./store";
import thunk from "redux-thunk";
import {Services} from "./services";
import {ConnectionService} from "./services/connections";
import {composeWithDevTools} from 'redux-devtools-extension';
import {ConfigurationService} from "./services/configuration";
import {DeploymentService} from "./services/deployments";
import {PackagingService} from "./services/packaging";
import {PackagerIntegrationService} from "./services/packager";
import {TrainingService} from "./services/trainings";
import {TrainingToolchainService} from "./services/toolchain";


export function configureStore(): Store<ApplicationState> {
    return createStore(
        createRootReducer,
        composeWithDevTools(applyMiddleware(thunk.withExtraArgument<Services>({
            connectionService: new ConnectionService(),
            configurationService: new ConfigurationService(),
            deploymentService: new DeploymentService(),
            packagingService: new PackagingService(),
            packagerService: new PackagerIntegrationService(),
            trainingService: new TrainingService(),
            toolchainService: new TrainingToolchainService(),
        })))
    );
}
