import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {DashboardPanel} from "../../components/DashboardPanel";
import Chart from "chart.js";
import {ModelTrainingState} from "../../store/trainings/types";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import {StateBorderColors, StateColors} from "../../components/color";

if (Chart.defaults.global.legend) {
    Chart.defaults.global.legend.display = false;
}

export const TrainingDashboardPanel: React.FC = () => {
    const trainingState = useSelector<ApplicationState, ModelTrainingState>(state => state.trainings);
    const chartRef = useRef<any>();
    const [chart, setChart] = useState<null | any>(null);

    useEffect(() => {
        if (chart != null) {
            return;
        }

        const unknownState = "Unknown";
        const trainingStates = ["Scheduling", "Running", "Failed", "Succeeded", unknownState];

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
                        return data.get(type.toLowerCase()) ?? 0
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
            icon={<FitnessCenterIcon/>}
            header={"Trainings"}
        >
            {/*Use ref instead of ID*/}
            <canvas id='Trainings-graph' ref={chartRef} width="240px" height="240px"/>
        </DashboardPanel>
    )
};
