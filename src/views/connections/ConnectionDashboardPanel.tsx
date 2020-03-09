import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {ConnectionState} from "../../store/connections/types";
import {DashboardPanel} from "../../components/DashboardPanel";
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import Chart from "chart.js";
import {ConnectionTypes} from "./types";

if (Chart.defaults.global.legend) {
    Chart.defaults.global.legend.display = false;
}

export const ConnectionDashboardPanel: React.FC = () => {
    const connectionsState = useSelector<ApplicationState, ConnectionState>(state => state.connections);
    const chartRef = useRef<any>();
    const [chart, setChart] = useState<null | any>(null);

    useEffect(() => {
        if (chart != null) {
            return;
        }

        // rewtite this shit
        const data = new Map<string, number>();

        Object.values(connectionsState.data).forEach((conn) => {
            const type = conn.spec?.type ?? '';
            data.set(type, (data.get(type) ?? 0) + 1)
        });

        const myChartRef = chartRef.current.getContext("2d");
        setChart(new Chart(myChartRef, {
            type: 'bar',
            data: {
                labels: Object.values(ConnectionTypes),
                datasets: [{
                    data: Object.values(ConnectionTypes).map((type) => {
                        return data.get(type) ?? 0
                    }),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }))
    }, []);

    return (
        <DashboardPanel
            icon={<SettingsInputComponentIcon/>}
            header={"Connections"}
        >
            {/*Use ref instead of ID*/}
            <canvas ref={chartRef} width="100%" height="100%"/>
        </DashboardPanel>
    )
};
