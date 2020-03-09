import React from 'react';

export interface GrafanaDashboardProps {
    deployment: boolean;
}

export const GrafanaDashboard: React.FC<GrafanaDashboardProps> = ({deployment}) => {
    const url = deployment ?
        'https://odahu.gke-legion-vitalik.ailifecycle.org/grafana/d/AdyEtcSZk/model-deployments?orgId=1&refresh=10s&kiosk&theme=light' :
        'https://odahu.gke-legion-vitalik.ailifecycle.org/grafana/d/ab4f13a9892a76a4d21ce8c2445bf4ea/pods?orgId=1&kiosk&theme=light'
    return (
        <div
            style={{width: "100%", height: '800px'}}
        >
            <iframe
                style={{width: "100%", maxHeight: '100%', height: "100%", border: 'none'}}
                src={url}>
            </iframe>
        </div>
    )

}
