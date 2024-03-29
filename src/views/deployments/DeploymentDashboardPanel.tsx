import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {DashboardPanel} from "../../components/DashboardPanel";
import Chart from "chart.js";
import {ModelDeploymentState} from "../../store/deployments/types";
import CloudIcon from '@material-ui/icons/Cloud';
import {StateBorderColors, StateColors} from "../../components/color";

if (Chart.defaults.global.legend) {
    Chart.defaults.global.legend.display = false;
}

export const DeploymentDashboardPanel: React.FC = () => {
    const trainingState = useSelector<ApplicationState, ModelDeploymentState>(state => state.deployments);
    const chartRef = useRef<any>();
    const [chart, setChart] = useState<null | any>(null);

    useEffect(() => {
        if (chart != null) {
            return;
        }

        const unknownState = "Unknown";
        const trainingStates = ["Processing", "Ready", "Failed", "Deleting", unknownState];

        // rewtite this shit
        const data = new Map<string, number>();

        Object.values(trainingState.data).forEach((conn) => {
            const state = conn.status?.state ?? unknownState;
            data.set(state, (data.get(state) ?? 0) + 1)
        });

        const myChartRef = chartRef.current.getContext("2d");
        setChart(new Chart(myChartRef, {
            type: 'pie',
            data: {
                labels: trainingStates,
                datasets: [{
                    data: Object.values(trainingStates).map((type) => {
                        return data.get(type) ?? 0
                    }),
                    backgroundColor: [
                        StateColors.PROCESSING,
                        StateColors.SUCCESS,
                        StateColors.FAILED,
                        StateColors.SCHEDULING,
                        StateColors.UNKNOWN,
                    ],
                    borderColor: [
                        StateBorderColors.PROCESSING,
                        StateBorderColors.SUCCESS,
                        StateBorderColors.FAILED,
                        StateBorderColors.SCHEDULING,
                        StateBorderColors.UNKNOWN,
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: {
                    duration: 0
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            display: false,
                            beginAtZero: true
                        }
                    }]
                }
            }
        }))
    }, []);

    return (
        <DashboardPanel
            icon={<CloudIcon/>}
            header={"Deployments"}
        >
            {/*Use ref instead of ID*/}
            <canvas id='Deployments-graph' ref={chartRef} width="240px" height="240px"/>
        </DashboardPanel>
    )
};
