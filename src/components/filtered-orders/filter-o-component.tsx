'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Order, OrderItem } from '@/lib/types';
import axiosInstanceClient from '@/lib/axios-client';
import { FilteredODataTable } from './filter-o-data-table';
import { columns } from './filter-o-colomns';

export default function SalesComponent() {
  const [ordersItems, setOrdersItems] = useState<OrderItem[]>([]);

  const getOrders = async () => {

    const allOrdersItems = await axiosInstanceClient.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/OrderItem`,
    );
    // console.log(allOrdersItems.data);
    // console.log(allOrdersItems.data.sort((a: any, b: any) => b.quantityOrdered * b.itemPrice - a.quantityOrdered * a.itemPrice));
    console.log(allOrdersItems.data.sort((a: any, b: any) => b.quantityOrdered - a.quantityOrdered ))
    const orderItemsData = allOrdersItems.data.sort((a: any, b: any) => b.quantityOrdered - a.quantityOrdered )
    setOrdersItems(orderItemsData)
  };
  
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <main>
      <Card className="">
        <CardHeader>
          <CardTitle>Most Payed Orders</CardTitle>
          <CardDescription>Analysis for the orders</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <BarChart/> */}
          <FilteredODataTable data={ordersItems} columns={columns}/>
        </CardContent>

        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </main>
  );
}
