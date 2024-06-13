'use client';

import { DataTable } from './data-table';
import { columns } from './columns';
import { Input } from '@/components/ui/input';
import { DialogComponent } from '@/components/dialog-trigger';
import { Supplier } from '@/lib/types';
import { PagesSkeleton } from '@/components/skeletons';
import { Suspense } from 'react';
import axiosInstance from '@/lib/axios';

async function getSuppliers(): Promise<Supplier[]> {
  const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier`);
  const suppliers: Supplier[] = res.data;
  return suppliers;
}

export default async function SuppliersPage() {
  const data = await getSuppliers();

  return (
    <main>
      <div className="flex justify-end items-center pr-3">
        <div className="p-2">
          <DialogComponent buttonName={'New Supplier'} title={'Create a new supplier'} />
        </div>
        <Suspense key={crypto.randomUUID()} fallback={<PagesSkeleton />}>
          <div className="flex items-center justify-between lg:justify-end">
            <div className="p-4">
              <Input
                type="number"
                placeholder="Filter for ID"
                className="w-32 p-2"
              ></Input>
            </div>
            <div className="p-4">
              <Input
                type="text"
                placeholder="Filter for Recipe"
                className="w-32 lg:w-full p-2"
              ></Input>
            </div>
          </div>
          <div className="p-4">
            <DataTable columns={columns} data={data} />
          </div>
        </Suspense>
      </main>
    </>
  );
}
