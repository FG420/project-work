import { Purchase } from '@/lib/types';
import { getPurchases } from '@/lib/data-fetching';
import PurchasesFilter from './purchases-filter';
import { DialogComponent } from '@/components/dialog-trigger';

export default async function PurchasePage () {
    const data: Purchase[] = await getPurchases();

    const purchases: Purchase[] = data.map( ( purchase: any ) => ( {
        purchaseID: purchase.purchaseID,
        supplierID: purchase.supplier.description,
        purchaseDate: new Date( purchase.purchaseDate ).toISOString().split( 'T' )[ 0 ],
        recipeNumber: purchase.recipeNumber,
        isLoaded: purchase.isLoaded,
        purchasedItems: purchase.purchasedItems.length
    } ) );

    return (
        <main className="">
            <div className="flex justify-end items-center p-2">
                <div className="">
                    <DialogComponent buttonName={ 'New Purchase' } title={ 'Create a New Purchase' } />
                </div>
            </div>

            <PurchasesFilter data={ purchases } />
        </main>
    );
}
