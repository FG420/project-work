import { purchases } from '@/lib/purchases';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Purchase } from '@/lib/interfaces';
import { Input } from '@/components/ui/input';
import { InputDataComponent } from '@/components/input-data';
import { DialogComponent } from '@/components/dialog-trigger';
import { Suspense } from 'react';
import { PagesSkeleton } from '@/components/skeletons';

async function getData(): Promise<Purchase[]> {
  return purchases.map((purchase) => ({
    PurchaseID: purchase.PurchaseID,
    SupplierID: purchase.SupplierID,
    RecipeDate: new Date(purchase.RecipeDate).toLocaleDateString(),
    RecipeNumber: purchase.RecipeNumber,
  }));
}

export default async function PurchasePage() {
  const data = await getData();
  return (
    <main>
      <div className="flex justify-end items-center pr-3">
        <div className="pb-2">
          <DialogComponent buttonName={'New Purchase'} title={'Create a New Purchase'} />
        </div>
      </div>

      <Suspense key={crypto.randomUUID()} fallback={<PagesSkeleton />}>
        <div className="p-2 flex items-center justify-end">
          <div className="p-1">
            <Input type="number" placeholder="Filter for ID" className="w-32 p-2"></Input>
          </div>
          <div className="p-1">
            <InputDataComponent></InputDataComponent>
          </div>
          <div className="p-1">
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
  );
}
