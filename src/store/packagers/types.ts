import {PackagingIntegration} from "../../models/odahuflow/PackagingIntegration";
import {ApplicationState} from "../index";

export interface PackagerState {
    readonly loading: boolean;
    readonly data: Record<string, PackagingIntegration>;
    readonly length: number;
    readonly error?: string;
}


export const packagerIDsSelector = (state: ApplicationState) =>
    Object.values(state.packagers.data).map(packager => packager.id);
