import {TrainingIntegration} from "../../models/odahuflow/TrainingIntegration";

export interface TrainingIntegrationState {
    readonly loading: boolean;
    readonly data: Record<string, TrainingIntegration>;
    readonly length: number;
    readonly error?: string;
}
