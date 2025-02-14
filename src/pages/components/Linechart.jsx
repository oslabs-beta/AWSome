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

export default function LineChart({ table }) {
  let Timestamps = [];
  let Values = [];
  let type = 'No Data';


  if (table !== 1) {
    const graphed = [];

    Timestamps = table.Timestamps;
    Values = table.Values;
    let Label = table.Label;
    let labels = [];

    if (Label === 'NetworkIn' || Label === 'NetworkOut') {
      type = 'Bytes';
    } else if (Label === 'CPUUtilization') {
      type = "Percent";
    } else {
      type = 'Count';
    }
    
    for (let i = 0; i < 12; i++) {
      let string = ''
      const newdate = new Date(Timestamps[i]);
      string = `${newdate.getHours()}:${newdate.getMinutes()}`;
      
      labels.push()
      graphed.push({ x: string, y: Values[i] });
    }

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
          labels: {
            color: 'white',
          },
        },
        title: {
          display: true,
          text: 'Instance: i-0610f2356e0d72fcd',
          color: 'white',
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'white',
          },
        },
        y: {
          ticks: {
            color: 'white',
          },
        },
      },
    };

    const data = {
      labels,
      datasets: [
        {
          fill: true,
          label: type,
          data: graphed,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    return (
      <div>
        <Line options={options} data={data} />
      </div>
    );












  } else {
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
          labels: {
            color: 'white',
          },
        },
        title: {
          display: true,
          text: 'Instance: i-0610f2356e0d72fcd',
          color: 'white',
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'white',
          },
        },
        y: {
          ticks: {
            color: 'white',
          },
        },
      },
    };

    const labels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    const fakedata = [
      { x: null , y: 0 },
      // { x: 5, y: null },
      // { x: 10, y: null },
      // { X: 15, y: null },
      // { x: 20, y: null },
      // { x: 25, y: null },
      // { x: 30, y: null },
      // { x: 35, y: null },
      // { x: 40, y: null },
      // { x: 45, y: null },
      // { x: 50, y: null },
      // { x: 55, y: null },
      // { x: 60, y: null },
      { x: null, y: 100 },
    ];

    const data = {
      labels,
      datasets: [
        {
          fill: true,
          label: 'No Data',
          data: fakedata,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    return (
      <div>
        <Line options={options} data={data} />
      </div>
    );
  }
}
