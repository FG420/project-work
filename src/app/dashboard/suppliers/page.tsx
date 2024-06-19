import { DialogComponent } from '@/components/dialog-trigger';
import { getSuppliers } from '@/lib/data-fetching';
import SuppliersFilters from './suppliers-filter';

export default async function SuppliersPage() {
  const data = await getSuppliers();

  return (
    <main>
      <div className="flex justify-end items-center pr-3">
        <div className="p-2">
          <DialogComponent buttonName={'New Supplier'} title={'Create a new supplier'} />
        </div>
      </div>
      <SuppliersFilters data={data} />
    </main>
  );
}
