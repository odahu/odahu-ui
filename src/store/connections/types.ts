import {Connection} from "../../models/odahuflow/Connection";

export interface ConnectionState {
    readonly loading: boolean;
    readonly data: Record<string, Connection>;
    readonly length: number;
    readonly error?: string;
}
