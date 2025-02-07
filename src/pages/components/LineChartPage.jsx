import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

export default function LineChartPage() {
  const [barX, setData] = useState([
    { x: 0, y: 10 },
    { x: 5, y: 20 },
    { x: 10, y: 30 },
    { X: 15, y: 40 },
    { x: 20, y: 50 },
    { x: 25, y: 10 },
    { x: 30, y: null },
    { x: 35, y: null },
    { x: 40, y: null },
    { x: 45, y: null },
    { x: 50, y: null },
    { x: 55, y: null },
    { x: 60, y: null },
    { x: null, y: 100 },
  ]);

  const labels = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Networt(IN/OUT)',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        barPercentage: 1,
        categoryPercentage: 1,
        label: '<40%',
        data: barX,
        backgroundColor: ['#3e95cd'],
      },
      {
        data: [
          { x: 0, y: 20 },
          { x: 5, y: 30 },
          { x: 10, y: 50 },
          { x: 15, y: 30 },
          { x: 20, y: 45 },
          { X: 25, y: 50 },
        ],
        backgroundColor: ['red'],
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}
