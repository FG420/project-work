'use client';

import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import { Bar, Line, Scatter, Bubble, Doughnut } from 'react-chartjs-2';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const data = {
  labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3],
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },

  elements: {
    line: {
      tension: 0,
      borderWidth: 2,
      borderColor: 'rgba(47,97,68,1)',
      fill: 'start',
      backgroundColor: 'rgba(47,97,68,0.3)',
    },
    point: {
      radius: 0,
      hitRadius: 0,
    },
  },
  scales: {
    xAxis: {
      display: false,
    },
    yAxis: {
      display: false,
    },
  },
};

const data2 = {
  labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Brutto',
      borderRadius: 30,
      data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3],
      backgroundColor: 'rgba(32, 214, 155, 1)',
      barThickness: 10,
    },
    {
      label: 'Netto',
      borderRadius: 20,
      data: [0.07, 0.3, 0.15, 0.2, 0.5, 0.3, 0.3, 0.2],
      backgroundColor: 'rgba(1, 98, 255, 1)',
      barThickness: 10,
    },
  ],
};

const options2 = {
  plugins: {
    legend: {
      position: 'top',
      align: 'start',
      labels: {
        boxWidth: 7,
        usePointStyle: true,
        pointStyle: 'circle',
      },
      title: {
        text: 'Sales Report',
        display: true,
        color: '#000',
        font: {
          size: 18,
        },
      },
    },
  },
  scales: {
    xAxis: {
      display: false,
    },
    yAxis: {
      max: 1,
    },
  },
  elements: {
    bar: {
      barPercentage: 0.3,
      categoryPercentage: 1,
    },
  },
};

const data3 = {
  backgoundColor: [
    'rgb(2, 88, 255)',
    'rgb(249, 151, 0)',
    'rgb(255, 199, 0)',
    'rgb(32, 214, 152)',
  ],
  labels: ['Event 1', 'Event 2', 'Event 3', 'Event 4'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100, 300],
      backgroundColor: [
        'rgb(2, 88, 255)',
        'rgb(249, 151, 0)',
        'rgb(255, 199, 0)',
        'rgb(32, 214, 152)',
      ],
      hoverOffset: 4,
    },
  ],
};

const options3 = {
  elements: {
    arc: {
      weight: 0.5,
      borderWidth: 3,
    },
  },
  cutout: 150,
};

export default function PurchaseChartComponent() {
  const option: ApexOptions = {
    series: [44, 55, 13, 33],
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          labels: {
            show: true,
            name: {},
            value: {},
          },
        },
      },
    },
  };

  const series = [
    {
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];

  return (
    <main className="">
      <Line data={data} height={40} options={options} />
      {/* <Bar data={data2} height={300} options={options2} /> */}
      {/* <Doughnut data={data3} width={50} height={50} options={options3} /> */}

      <ApexChart type="line" options={option} series={series} height={200} width={500} />
    </main>
  );
}
