'use client';

import axiosInstanceClient from '@/lib/axios-client';
import { Supplier } from '@/lib/types';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from './ui/label';

export default function HomeComeponent() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const getSuppliers = async () => {
    const getPurchaseSuppliers = await axiosInstanceClient.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Purchase`,
    );

    const getSupps = await axiosInstanceClient.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier`,
    );

    console.log(getSupps.data)

    // console.log(
    //   getPurchaseSuppliers.data.map((purchase) =>
    //     purchase.purchasedItems
    //       .map((item) => item.price * item.quantity)
    //       .reduce((partial: any, a: any) => partial + a, 0),
    //   )
    // );

    // console.log(
    //   getPurchaseSuppliers.data
    //   .filter((purchase) => purchase.purchasedItems.length >= 3)
    //   .map((supplier) => supplier.supplier)
    // );

    setSuppliers(
      getPurchaseSuppliers.data.map((supplier: { supplier: any }) => supplier.supplier),
    );
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <main>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Analysis Card</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
       
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </main>
  );
}
