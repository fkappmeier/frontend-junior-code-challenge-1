/* eslint-disable no-unused-vars */
import randomColor from 'randomcolor';

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
);

export function drawBarChart(percentageArray, columnNames) {
  const canvas = document.getElementById('bar-chart-canvas');
  const backgroundColors = [];

  percentageArray.forEach((column) => {
    backgroundColors.push(randomColor());
  });

  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: columnNames,
      datasets: [{
        label: '',
        data: percentageArray,
        backgroundColor: backgroundColors,
        borderWidth: 0,
      }],
    },
    options: {
      indexAxis: 'y',
      plugins: {
        title: {
          display: true,
          text: '% of Filled Fields per Column',
          color: '#dedede',
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: '#5b5b5b',
          },
          ticks: {
            color: '#dedede',
          },
        },
        y: {
          grid: {
            color: '#5b5b5b',
          },
          ticks: {
            color: '#dedede',
          },
        },
      },
    },
  });
}

export function drawPieChart(percentageArray) {
  const canvas = document.getElementById('pie-chart-canvas');

  const chartLabels = [];
  const backgroundColors = [];

  percentageArray.forEach((column, index) => {
    chartLabels.push(`${index} filled in Data Fields`);
    backgroundColors.push(randomColor());
  });

  const chart = new Chart(canvas, {
    type: 'pie',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Amount of filled in Data Fields per Row in %',
        data: percentageArray,
        backgroundColor: backgroundColors,
        borderWidth: 0,
      }],
    },
    options: {
      color: '#dedede',
      plugins: {
        title: {
          display: true,
          text: '% of Rows with X filled in Fields',
          color: '#dedede',
        },
      },
    },
  });
}
