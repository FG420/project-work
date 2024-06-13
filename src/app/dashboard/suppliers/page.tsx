'use client';

import { DataTable } from './data-table';
import { columns } from './columns';
import { Input } from '@/components/ui/input';
import { DialogComponent } from '@/components/dialog-trigger';
import axios from 'axios';
import { Supplier } from '@/lib/types';
import { useEffect, useState } from 'react';

// async function getSuppliers(): Promise<Supplier[]> {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier`);
//   const suppliers: Supplier[] = res.data;
//   return suppliers;
// }

export default function SuppliersPage() {
  // const data = await getSuppliers();

  const [data, setData] = useState<Supplier[]>([]);
  const [filteredData, setFilteredData] = useState<Supplier[]>([]);

  const getData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier`);
    const suppliers: Supplier[] = res.data;
    setData(suppliers);
  };

  const filterByName = (name: string) => {
    const filter = data.filter((supplier) => supplier.description.includes(name));
    setFilteredData(filter);
  };

  const filterById = (id: string) => {
    const filter = data.filter((supplier) => supplier.supplierID.includes(id));
    setFilteredData(filter);
  };

  useEffect(() => {
    getData();
  });

  return (
    <main>
      <div className="flex justify-end items-center pr-3">
        <div className="p-2">
          <DialogComponent buttonName={'New Supplier'} title={'Create a new supplier'} />
        </div>
      </div>
      <div className="flex items-center justify-between lg:justify-end">
        <div className="p-4">
          <Input
            type="text"
            placeholder="Filter for ID"
            className="w-32 lg:w-full p-2"
            onChange={(e) => filterById(e.target.value)}
          ></Input>
        </div>
        <div className="p-4">
          <Input
            type="text"
            placeholder="Filter for Name"
            className="w-32 lg:w-full p-2"
            onChange={(e) => filterByName(e.target.value)}
          />
        </div>
      </div>
      <div className="p-4">
        {filteredData.length !== 0 ? (
          <DataTable columns={columns} data={filteredData} />
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </main>
  );
}
