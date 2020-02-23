import {ModelTraining} from "../../models/odahuflow/ModelTraining";

export interface ModelTrainingState {
    readonly loading: boolean;
    readonly data: Record<string, ModelTraining>;
    readonly length: number;
    readonly error?: string;
}
