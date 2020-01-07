import {ToolchainIntegration} from "../../models/odahuflow/ToolchainIntegration";

export interface ToolchainState {
    readonly loading: boolean;
    readonly data: Record<string, ToolchainIntegration>;
    readonly length: number;
    readonly error?: string;
}
