import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {DashboardPanel} from "../../components/DashboardPanel";
import Chart from "chart.js";
import WorkIcon from '@material-ui/icons/Work';
import {ModelPackagingState} from "../../store/packaging/types";
import {StateBorderColors, StateColors} from "../../components/color";

if (Chart.defaults.global.legend) {
    Chart.defaults.global.legend.display = false;
}

export const PackagingDashboardPanel: React.FC = () => {
    const trainingState = useSelector<ApplicationState, ModelPackagingState>(state => state.packagings);
    const chartRef = useRef<any>();
    const [chart, setChart] = useState<null | any>(null);

    useEffect(() => {
        if (chart != null) {
            return;
        }

        const unknownState = "unknown";
        const trainingStates = ["scheduling", "running", "failed", "succeeded", unknownState];

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
                        StateColors.SCHEDULING,
                        StateColors.PROCESSING,
                        StateColors.FAILED,
                        StateColors.SUCCESS,
                        StateColors.UNKNOWN,
                    ],
                    borderColor: [
                        StateBorderColors.SCHEDULING,
                        StateBorderColors.PROCESSING,
                        StateBorderColors.FAILED,
                        StateBorderColors.SUCCESS,
                        StateBorderColors.UNKNOWN,
                    ],
                    borderWidth: 1
                }]
            },
            options: {
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
            icon={<WorkIcon/>}
            header={"Packaging"}
        >
            {/*Use ref instead of ID*/}
            <canvas ref={chartRef} width="100%" height="100%"/>
        </DashboardPanel>
    )
};
