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
        <main className='container mx-auto'>
            <div className="flex justify-end items-center pt-4 pr-4 pb-2">
                <div className=" ">
                    <DialogComponent buttonName={ 'New Purchase' } title={ 'Create a New Purchase' } />
                </div>
            </div>

            <PurchasesFilter data={ purchases } />
        </main>
    );
}
