'use client';

import { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { format, isWithinInterval, startOfWeek } from 'date-fns';
import axiosInstanceClient from '@/lib/axios-client';
import { DatePickerWithRange } from '../date-range-picker';
import { DateRange } from 'react-day-picker';
import { Item, Order, OrderItem } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
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

  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);

  const handleDateChange = (dates: DateRange) => {
    setDateRange(dates);
  };

  const handleItemChange = (event: string) => {
    setSelectedItem(event);
  };

  const fetchData = useCallback(async () => {
    const orders = await fetchOrders();
    const orderItems = await fetchOrderItems();

    // Combine order items into orders
    const combinedOrders = orders.map((order: Order) => {
      return {
        ...order,
        orderItems: orderItems.filter(
          (item: OrderItem) => item.amazonOrderID === order.amazonOrderID,
        ),
      };
    });

    // Filter combinedOrders based on date range and selected item
    const filteredOrders = combinedOrders.filter((order: Order) => {
      const purchaseDate: Date = new Date(order.purchaseDate);

      // Check if order falls within the selected date range
      if (dateRange?.from && dateRange?.to) {
        const isWithinDateRange = isWithinInterval(purchaseDate, {
          start: dateRange.from,
          end: dateRange.to,
        });
        if (!isWithinDateRange) return false;
      }

      return true;
    });

    const salesData = processSalesData(filteredOrders, selectedItem);

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
  }, [dateRange, selectedItem]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    async function fetchItems() {
      const response = await axiosInstanceClient.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Item`,
      );
      const data = await response.data;
      setItems(data);
    }

    fetchItems();
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
      <Select onValueChange={handleItemChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select an item" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.asin} value={item.asin}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DatePickerWithRange onDateChange={handleDateChange} />
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

function processSalesData(orders: Order[], selectedItem: string) {
  const salesData: { [key: string]: { totalQuantity: number; totalRevenue: number } } =
    {};

  orders.forEach((order) => {
    const purchaseDate: Date = new Date(order.purchaseDate);
    const weekStart = startOfWeek(purchaseDate);
    const weekKey = format(weekStart, 'dd-MM-yyyy');

    if (!salesData[weekKey]) {
      salesData[weekKey] = {
        totalQuantity: 0,
        totalRevenue: 0,
      };
    }

    order.orderItems.forEach((item) => {
      if (item.asin === selectedItem || !selectedItem) {
        salesData[weekKey].totalQuantity += item.quantityOrdered;
        salesData[weekKey].totalRevenue += item.itemPrice * item.quantityOrdered;
      }
    });
  });

  return salesData;
}
