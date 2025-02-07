import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

export default function LineChart() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


  const fakedata = [
    { x: 0, y: 12 },
    { x: 5, y: 32 },
    { x: 10, y: 46 },
    { X: 15, y: 70 },
    { x: 20, y: null },
    { x: 25, y: null },
    { x: 30, y: null },
    { x: 35, y: null },
    { x: 40, y: null },
    { x: 45, y: null },
    { x: 50, y: null },
    { x: 55, y: null },
    { x: 60, y: null },
    { x: null, y: 100 },
  ]

  const fakedata2 = [
    { x: 20, y: 50 },
    { x: 25, y: 30 },
    { x: 30, y: 50 },
    { x: 35, y: 60},
    { x: 40, y: 1 },
    { x: 45, y: 64 },
    { x: 50, y: 77 },
    { x: 55, y: 99 },
    { x: 60, y: 5 },
    { x: null, y: 100 },
  ]

  
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Write Operations',
        data: fakedata,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        fill: true,
        label: 'Read Operations',
        data: fakedata2,
        borderColor: 'red',
        backgroundColor: 'red',
      },
    ],
  };




  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
