import React from 'react';
import {createStyles, makeStyles} from "@material-ui/core/styles";


export interface LogsProps {
    logsURL: string;
}

const useLogsDashboardStyles = makeStyles(() =>
    createStyles({
        root: {
            width: "100%",
            // TODO: We need to calculate the height
            height: '800px'
        },
        logsDashboardIFrame: {
            width: "100%",
            maxHeight: '100%',
            height: "100%",
            border: 'none'
        },
    }),
);

export const LogsDashboard: React.FC<LogsProps> = ({logsURL}) => {
    const classes = useLogsDashboardStyles();

    return (
        <div
            className={classes.root}
        >
            <iframe
                className={classes.logsDashboardIFrame}
                src={logsURL}>
            </iframe>
        </div>
    )

};

export function createLogsURL(baseLogsURL: string, parameters: Record<string, string | any>): string {
    let filterKey = Object.keys(parameters)[0];
    let filterVal = Object.values(parameters)[0];
    let a = "_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:logstash,key:KEY,negate:!f,params:(query:VALUE),type:phrase),query:(match_phrase:(KEY:VALUE)))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:15,i:a637bcb2-4c05-4ad8-ad59-89cb37c9c66c,w:48,x:0,y:0),id:e0d473a0-a6c1-11ea-bc41-3318d1349021,panelIndex:a637bcb2-4c05-4ad8-ad59-89cb37c9c66c,type:search,version:'7.6.2')),query:(language:kuery,query:''),timeRestore:!f,title:'',viewMode:view)&query='KEY:VALUE'".replace(/VALUE/g, filterVal).replace(/KEY/g, filterKey);


    return baseLogsURL + '?' + a + '&embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1y,to:now))'
}

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
