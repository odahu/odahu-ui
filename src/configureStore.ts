import {applyMiddleware, createStore, Store} from "redux";
import {ApplicationState, createRootReducer} from "./store";
import thunk from "redux-thunk";
import {Services} from "./services";
import {ConnectionService} from "./services/connections";
import {composeWithDevTools, EnhancerOptions} from 'redux-devtools-extension';
import {ConfigurationService} from "./services/configuration";
import {DeploymentService} from "./services/deployments";
import {PackagingService} from "./services/packaging";
import {PackagerIntegrationService} from "./services/packager";
import {TrainingService} from "./services/trainings";
import {TrainingToolchainService} from "./services/toolchain";
import {UserService} from "./services/user";

let services: Services;

export function getServices(): Services {
    if (services !== null) {
        return services
    }
    services = {
        connectionService: new ConnectionService(),
        configurationService: new ConfigurationService(),
        userService: new UserService(),
        deploymentService: new DeploymentService(),
        packagingService: new PackagingService(),
        packagerService: new PackagerIntegrationService(),
        trainingService: new TrainingService(),
        toolchainService: new TrainingToolchainService(),
    }
    return services
}

export function configureStore(): Store<ApplicationState> {

    const opts: EnhancerOptions = {}
    if (process.env.NODE_ENV === 'development') {
        opts.trace = true
        opts.traceLimit = 15
        console.log("dev mode")
    }
    const composeEnhancers = composeWithDevTools(opts)

    services = getServices()

    return createStore(
        createRootReducer,
        composeEnhancers(
            applyMiddleware(thunk.withExtraArgument<Services>(services))
        )
    );
}
