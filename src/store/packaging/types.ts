import {ModelPackaging} from "../../models/odahuflow/ModelPackaging";

export interface ModelPackagingState {
    readonly loading: boolean;
    readonly data: Record<string, ModelPackaging>;
    readonly length: number;
    readonly error?: string;
}
