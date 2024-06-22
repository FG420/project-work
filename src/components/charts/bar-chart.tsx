'use client';

import { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { format, isWithinInterval, startOfWeek } from 'date-fns';
import axiosInstanceClient from '@/lib/axios-client';
import { DatePickerWithRange } from '../date-range-picker';
import { DateRange } from 'react-day-picker';
import { Category, Item, Marketplace, Order, OrderItem } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';

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
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>('');
  const [category, setCategory] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // New states to force re-render
  const [selectKey, setSelectKey] = useState(0);
  const [datePickerKey, setDatePickerKey] = useState(0);

  const resetFilters = () => {
    setSelectedItem('');
    setSelectedMarketplace('');
    setSelectedCategory('');
    setDateRange(undefined);
    // Update keys to force re-render
    setSelectKey((prevKey) => prevKey + 1);
    setDatePickerKey((prevKey) => prevKey + 1);
  };

  const handleDateChange = (dates: DateRange) => {
    setDateRange(dates);
  };

  const handleItemChange = (event: string) => {
    setSelectedItem(event);
  };

  const handleMarketplaceChange = (event: string) => {
    setSelectedMarketplace(event);
  };

  const handleCategoryChange = (event: string) => {
    setSelectedCategory(event);
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

      // Check if order contains the selected item
      if (selectedItem) {
        const containsSelectedItem = order.orderItems.some(
          (item) => item.asin === selectedItem,
        );
        if (!containsSelectedItem) return false;
      }

      // Check if order is from the selected marketplace
      if (selectedMarketplace) {
        const isFromSelectedMarketplace = order.marketplaceID === selectedMarketplace;
        if (!isFromSelectedMarketplace) return false;
      }

      // Check if order contains an item from the selected category
      if (selectedCategory) {
        const containsCategoryItem = order.orderItems.some(
          (item) => item.item.categoryID === selectedCategory,
        );
        if (!containsCategoryItem) return false;
      }

      return true;
    });

    const salesData = processSalesData(filteredOrders, selectedItem);

    const labels = Object.keys(salesData);

    const totalQuantities = labels.map((week) => salesData[week].totalQuantity);
    const totalRevenues = labels.map((week) => salesData[week].totalRevenue);

    setChartData({
      // @ts-ignore
      labels,
      datasets: [
        {
          label: 'Total Quantity Sold',
          // @ts-ignore
          data: totalQuantities,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Total Revenue',
          // @ts-ignore
          data: totalRevenues,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [dateRange, selectedItem, selectedMarketplace, selectedCategory]);

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

    async function fetchMarketplaces() {
      const response = await axiosInstanceClient.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Marketplace`,
      );

      const data = await response.data;
      setMarketplaces(data);
    }

    async function fetchCategories() {
      const response = await axiosInstanceClient.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Category`,
      );

      const data = await response.data;
      setCategory(data);
    }

    fetchCategories();
    fetchItems();
    fetchMarketplaces();
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex justify-center items-center">
      <div style={{ maxWidth: '1200px' }}>
        <div className="flex justify-around items-center">
          <div className="p-2">
            <Select key={selectKey} onValueChange={handleItemChange}>
              <SelectTrigger>
                <SelectValue placeholder="Item" />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.asin} value={item.asin}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-2 w-full">
            <Select key={selectKey} onValueChange={handleMarketplaceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Marketplace" />
              </SelectTrigger>
              <SelectContent>
                {marketplaces.map((item) => (
                  <SelectItem key={item.marketplaceID} value={item.marketplaceID}>
                    {item.marketplaceName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-2 w-full">
            <Select key={selectKey} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {category.map((item) => (
                  <SelectItem key={item.categoryID} value={item.categoryID}>
                    {item.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-2 w-full">
            <DatePickerWithRange key={datePickerKey} onDateChange={handleDateChange} />
          </div>

          <div className="p-2">
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        </div>

        <div className="flex justify-center items-center p-4">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarChart

async function fetchOrders() {
  const response = await axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Order`,
    
  )
  console.log(response.data)

  const data = await response.data;
  return data;
}

async function fetchOrderItems() {
  const response = await axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/OrderItem`,
  )
  console.log(response.data)
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
