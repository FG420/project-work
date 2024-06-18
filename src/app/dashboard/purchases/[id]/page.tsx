'use client'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import axiosInstanceClient from '@/lib/axios-client';
import { Purchase, PurchasedItem } from '@/lib/types';
import { useEffect, useState } from 'react';

// export const data = [
//   {
//     id: 1,
//     purchaseId: 1,
//     ASIN: 9,
//     quantity: 3,
//     price: 40,
//   },
//   {
//     id: 2,
//     purchaseId: 2,
//     ASIN: 3,
//     quantity: 10,
//     price: 89,
//   },
//   {
//     id: 3,
//     purchaseId: 3,
//     ASIN: 8,
//     quantity: 21,
//     price: 67,
//   },
//   {
//     id: 4,
//     purchaseId: 4,
//     ASIN: 5,
//     quantity: 40,
//     price: 20,
//   },
//   {
//     id: 5,
//     purchaseId: 1,
//     ASIN: 1,
//     quantity: 6,
//     price: 30,
//   },
// ];



export default function PurchaseItemsPage({ params }: any) {

  const [data, setData] = useState<PurchasedItem[]>([]);


  const [puchaseId, setPurchaseId] = useState<Purchase>()

  const getPurchaseId = async () => {
    const getId = await axiosInstanceClient.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Purchase/${params.id}`)
    setPurchaseId(getId.data)
  }


  // const getData = async () => {
  //   const allPurchasedItems = await axiosInstanceClient.get(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/PurchasedItem`,
  //   );

  //   // const purchases = allPurchases.data.map((purchase: any) => ({
  //   //   purchaseID: purchase.purchaseID,
  //   //   supplierID: purchase.supplierID,
  //   //   purchaseDate: new Date(purchase.purchaseDate).toLocaleDateString(),
  //   //   recipeNumber: purchase.recipeNumber,
  //   //   isLoaded: purchase.isLoaded,
  //   // }));

  //   console.log(allPurchasedItems.data)
  //   setData(allPurchasedItems.data);
  // };


  
  // const getData = data.filter((prodId) => prodId.purchaseId == params.id);


  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <main>
      <div className="p-4 ">
        <h1 className="font-semibold text-2xl p-1">Items of Purchase {params.id}</h1>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-5">
          {data.map((item) => (
            <Card className="w-[350px]" key={item.purchasedItemID}>
              <CardHeader>
                <CardTitle>Asin: {item.asin}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Quantity: {item.quantity}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between">
                <CardDescription>Price: {item.price} €</CardDescription>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
