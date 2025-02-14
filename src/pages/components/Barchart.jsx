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

export default function BarChart({ table }) {
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
      type = 'Percent';
    } else {
      type = 'Count';
    }

    // why does Timestamps.length give error
    for (let i = 0; i < 12; i++) {
      let string = '';
      const newdate = new Date(Timestamps[i]);
      string = `${newdate.getHours()}:${newdate.getMinutes()}`;

      labels.push();
      graphed.push({ x: string, y: Values[i] });
    }

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
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
          barPercentage: 1,
          categoryPercentage: 1,
          label: type,
          data: graphed,
          backgroundColor: [
            '#3e95cd',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850',
          ],
        },
      ],
    };

    return (
      <div>
        <Bar options={options} data={data} />
      </div>
    );
  } else {

    const [barX, setData] = useState([
      { x: 0, y: null },
      { x: 5, y: null },
      { x: 10, y: null },
      { X: 15, y: null },
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
    ]);

    const labels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
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
          barPercentage: 1,
          categoryPercentage: 1,
          data: barX,
          label: 'No Data',
          backgroundColor: [
            '#3e95cd',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850',
          ],
        },
      ],
    };

    return (
      <div>
        <Bar options={options} data={data} />
      </div>
    );
  }
}
