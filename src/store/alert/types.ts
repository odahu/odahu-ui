import {Color} from "@material-ui/lab/Alert";


export interface AlertState {
    readonly title: string;
    readonly content: string;
    readonly severity: Color;
    readonly open: boolean;
}
