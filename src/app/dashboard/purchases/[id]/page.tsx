'use client';

import axiosInstanceClient from '@/lib/axios-client';
import { PurchasedItem } from '@/lib/types';
import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Label } from '@/components/ui/label';

export default function PurchaseItemsPage({ params }: any) {
  const [data, setData] = useState<PurchasedItem[]>([]);
  const [price, setPrice] = useState<number>();

  const getPurchasedItems = async () => {
    const getId = await axiosInstanceClient.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Purchase/${params.id}`,
    );

    setData(getId.data.purchasedItems);
    setPrice(getId.data.purchasedItems.map((item: any) => item.price * item.quantity).reduce((partial: any, a: any) => partial + a, 0))

  };
  

  useEffect(() => {
    getPurchasedItems();
  }, []);

  return (
    <main>
      <div className="p-4 ">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl p-1">Items of Purchase {params.id}</h1>

          <Label className='text-lg'> Tot. Purchase: {price}</Label>
        </div>
      </div>
      <div className="p-4">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
