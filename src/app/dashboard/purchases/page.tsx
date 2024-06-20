import { Purchase } from '@/lib/types';
import { getPurchases } from '@/lib/data-fetching';
import PurchasesFilter from './purchases-filter';
import { DialogComponent } from '@/components/dialog-trigger';

export default async function PurchasePage() {
  const data: Purchase[] = await getPurchases();

  const purchases: Purchase[] = data.map((purchase: any) => ({
    purchaseID: purchase.purchaseID,
    supplierID: purchase.supplier.description,
    purchaseDate: new Date(purchase.purchaseDate).toISOString().split('T')[0],
    recipeNumber: purchase.recipeNumber,
    isLoaded: purchase.isLoaded,
  }));

  return (
    <main>
      <div className="flex justify-end items-center pr-3 pt-3">
        <div className="pb-2">
          <DialogComponent buttonName={'New Purchase'} title={'Create a New Purchase'} />
        </div>
      </div>

      <PurchasesFilter data={purchases} />
    </main>
  );
}
