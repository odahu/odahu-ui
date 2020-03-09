import React from 'react';
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useGrafanaDashboardStyles = makeStyles(() =>
    createStyles({
        root: {
            width: "100%",
            // TODO: We need to calculate the height
            height: '800px'
        },
        grafanaDashboardIFrame: {
            width: "100%",
            maxHeight: '100%',
            height: "100%",
            border: 'none'
        },
    }),
);

export interface GrafanaDashboardProps {
    dashboardURL: string;
}

export const GrafanaDashboard: React.FC<GrafanaDashboardProps> = ({dashboardURL}) => {
    const classes = useGrafanaDashboardStyles();

    return (
        <div
            className={classes.root}
        >
            <iframe
                className={classes.grafanaDashboardIFrame}
                src={dashboardURL}>
            </iframe>
        </div>
    )

};

/**
 * Calculate the final URL of a Grafana dashboard
 */
export function createDashboardURL(baseDashboardURL: string, parameters: Record<string, string | undefined>): string {
    const dashboardURLParams: typeof parameters = {
        orgId: "1",
        theme: "light"
    };

    for (const [paramName, paramValue] of Object.entries(parameters)) {
        dashboardURLParams[`var-${paramName}`] = paramValue
    }

    const searchParams = new window.URLSearchParams(dashboardURLParams as any);

    return baseDashboardURL + '?' + searchParams.toString() + '&kiosk'
}
