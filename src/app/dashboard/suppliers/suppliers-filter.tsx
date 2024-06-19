'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { DataTable } from './data-table';
import { Supplier } from '@/lib/types';
import { columns } from './columns';

type SupplieFiltersProps = {
  data: Supplier[];
};

export default function SuppliersFilters({ data }: SupplieFiltersProps) {
  const [filteredData, setFilteredData] = useState<Supplier[]>([]);

  const filterByName = (name: string) => {
    const filter = data.filter((supplier) => supplier.description.includes(name));
    setFilteredData(filter);
  };

  const filterById = (id: string) => {
    const filter = data.filter((supplier) => supplier.supplierID.includes(id));
    setFilteredData(filter);
  };

  return (
    <>
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
    </>
  );
}
