'use client';

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { format, startOfWeek } from 'date-fns';
import axiosInstanceClient from '@/lib/axios-client';
Chart.register(...registerables);

const BarChartPurchases = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Quantity Purchases',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Purchases',
        data: [],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      const purchases = await fetchPurchase();

      const processedPurchases = purchases.map((purchase) => ({
        ...purchase,
        purchaseItems: typeof purchase.purchasedItems === 'string'
          ? JSON.parse(purchase.purchasedItems)
          : purchase.purchasedItems,
      }));

      const salesData = processSalesData(processedPurchases);

      const labels = Object.keys(salesData);
      const totalQuantities = labels.map((week) => salesData[week].totalQuantity);
      const totalRevenues = labels.map((week) => salesData[week].totalRevenue);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Total Quantity Purchases',
            data: totalQuantities,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Total Purchases',
            data: totalRevenues,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      });
    }

    fetchData();
  }, []);

  const options = {
    scales: {
      y: {
        type: 'logarithmic',
        ticks: {
          callback: function(value) {
            if (value === 100 || value === 1000 || value === 10000 || value === 100000 || value === 1000000) {
              return value.toLocaleString()
            }
            return null
          },
        },
      },
    },
  }

  return (
    <div style={{ maxWidth: '500px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChartPurchases;

async function fetchPurchase() {
  const response = await axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Purchase`
  );
  return response.data;
}

async function fetchPurchaseItems() {
  const response = await axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/OrderItem`
  );
  return response.data;
}

function processSalesData(purchases) {
  const salesData = {};

  purchases.forEach((purchase) => {
    const purchaseDate = new Date(purchase.purchaseDate);
    const weekStart = startOfWeek(purchaseDate);
    const weekKey = format(weekStart, 'yyyy-MM-dd');

    if (!salesData[weekKey]) {
      salesData[weekKey] = {
        totalQuantity: 0,
        totalRevenue: 0,
      };
    }

    purchase.purchaseItems.forEach((item) => {
      salesData[weekKey].totalQuantity += item.quantity;
      salesData[weekKey].totalRevenue += item.price * item.quantity;
    });
  });

  console.log('Processed Sales Data:', salesData);

  return salesData;
}
