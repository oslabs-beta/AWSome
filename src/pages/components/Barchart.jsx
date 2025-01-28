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

export default function BarChart() {
  // fetch data of the previous hour never the current
  // map data to the bar chart in dataset
  // change the colors to match 'red, green, blue'
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
    { x: null, y: 30 },
  ]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      try {
        let promise = await fetch('/data');
        let data = await promise.json();
        //console.log(data[0]);
        setRefresh(true);
        setData((old) => {
          for (let i = 0; i < old.length - 1; i++) {
            old[i].y = data[0].Values[i];
          }
          console.log('new data', old);
          return old;
        });
      } catch (error) {
        console.log('fetchData function in barchart.jsx', error);
      }
    }

    
    fetchdata();
  }, [barX]);


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
        text: new Date('2025-01-27T18:50:00.000Z'),
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
        label: '<40%',
        data: barX,
        backgroundColor: [
          '#3e95cd',
          '#8e5ea2',
          '#3cba9f',
          '#e8c3b9',
          '#c45850',
        ],
      },
      {
        label: '<75',
      },
      {
        label: '>85%',
      },
    ],
  };


  
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}
