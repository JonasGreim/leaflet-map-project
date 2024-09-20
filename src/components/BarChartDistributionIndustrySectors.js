import React from 'react';
import "./../styles.css";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const StackedBarChart = ({industrySectorCountData}) => {
    const data = {
        labels: ['Industry Sector'],
        datasets: [
            {
                label: 'Basic Materials',
                data: [industrySectorCountData[0]],   // Proportion or value for element
                backgroundColor: '#27AB7C',
            },
            {
                label: 'Communications',
                data: [industrySectorCountData[1]],
                backgroundColor: '#00B0F0',
            },
            {
                label: 'Consumer Cyclical',
                data: [industrySectorCountData[2]],
                backgroundColor: '#305496',
            },
            {
                label: 'Consumer Defensive',
                data: [industrySectorCountData[3]],
                backgroundColor: '#EAB829',
            },
            {
                label: 'Energy',
                data: [industrySectorCountData[4]],
                backgroundColor: '#000000',
            },
            {
                label: 'Financials',
                data: [industrySectorCountData[5]],
                backgroundColor: '#7D7D7D',
            },
            {
                label: 'Health Care',
                data: [industrySectorCountData[6]],
                backgroundColor: '#EB4A9C',
            },
            {
                label: 'Industrials',
                data: [industrySectorCountData[7]],
                backgroundColor: '#C00000',
            },
            {
                label: 'Information Technology',
                data: [industrySectorCountData[8]],
                backgroundColor: '#7DB440',
            },
            {
                label: 'Utilities',
                data: [industrySectorCountData[9]],
                backgroundColor: '#DE7728',
            },
        ],
    };

    const options = {
        indexAxis: 'y',  // Make the bar horizontal
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    display: false,
                },
            },
            y: {
                stacked: true,
                ticks: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
                position: 'right',
            },
            title: {
                display: false,
                text: 'Distribution of the industry sectors',
            },
        },
    };

    return <Bar className="horizontal-bar-chart" data={data} options={options} />;
};

export default StackedBarChart;