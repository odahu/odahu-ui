import {PackagingIntegration} from "../../models/odahuflow/PackagingIntegration";

export interface PackagerState {
    readonly loading: boolean;
    readonly data: Record<string, PackagingIntegration>;
    readonly length: number;
    readonly error?: string;
}
