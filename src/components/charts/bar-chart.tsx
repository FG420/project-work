'use client';

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { format, startOfWeek } from 'date-fns';
import axiosInstanceClient from '@/lib/axios-client';
Chart.register(...registerables);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Quantity Sold',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Revenue',
        data: [],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      const orders = await fetchOrders();
      const orderItems = await fetchOrderItems();

      // Combine order items into orders
      const combinedOrders = orders.map((order) => {
        return {
          ...order,
          orderItems: orderItems.filter(
            (item) => item.amazonOrderID === order.amazonOrderID,
          ),
        };
      });

      const salesData = processSalesData(combinedOrders);

      const labels = Object.keys(salesData);
      const totalQuantities = labels.map((week) => salesData[week].totalQuantity);
      const totalRevenues = labels.map((week) => salesData[week].totalRevenue);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Total Quantity Sold',
            data: totalQuantities,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Total Revenue',
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
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;

async function fetchOrders() {
  const response = await axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Order`,
  );
  const data = await response.data;
  return data;
}

async function fetchOrderItems() {
  const response = await axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/OrderItem`,
  );
  const data = await response.data;
  return data;
}

function processSalesData(orders) {
  const salesData = {};

  orders.forEach((order) => {
    const purchaseDate = new Date(order.purchaseDate);
    const weekStart = startOfWeek(purchaseDate);
    const weekKey = format(weekStart, 'yyyy-MM-dd');

    if (!salesData[weekKey]) {
      salesData[weekKey] = {
        totalQuantity: 0,
        totalRevenue: 0,
      };
    }

    order.orderItems.forEach((item) => {
      salesData[weekKey].totalQuantity += item.quantityOrdered;
      salesData[weekKey].totalRevenue += item.itemPrice * item.quantityOrdered;
    });
  });

  return salesData;
}
