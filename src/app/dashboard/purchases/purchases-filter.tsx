'use client';

import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useState } from 'react';
import { Purchase } from '@/lib/types';

type PurchasesFilterProps = {
    data: Purchase[];
};

export default function PurchasesFilter ( { data }: PurchasesFilterProps ) {
    const [ filteredData, setFilteredData ] = useState<Purchase[]>( [] );

    const filterById = ( id: string ) => {
        const filter = data.filter( ( purchase ) => purchase.purchaseID.includes( id ) );
        setFilteredData( filter );
    };

    const filterBySupplierId = ( suppId: string ) => {
        const filter = data.filter( ( purchase ) => purchase.supplierID.includes( suppId ) );
        setFilteredData( filter );
    };

    const filterByRecipe = ( recipe: string ) => {
        const filter = data.filter( ( purchase ) => purchase.recipeNumber.includes( recipe ) );
        setFilteredData( filter );
    };

    const filterByDate = ( date: string ) => {
        console.log( 'Filtering by date:', date );
        const filter = data.filter( ( purchase ) => {
            console.log( 'Comparing:', purchase.purchaseDate, date );
            return purchase.purchaseDate === date;
        } );
        console.log( 'Filtered Data:', filter );
        setFilteredData( filter );
    };

    const filterByLoaded = ( loaded: any ) => {
        if ( loaded === 'all' ) {
            setFilteredData( data );
        } else if ( loaded === 'only-loaded' ) {
            const filter = data.filter( ( purchase ) => purchase.isLoaded === true );
            setFilteredData( filter );
        } else {
            const filter = data.filter( ( purchase ) => purchase.isLoaded === false );
            setFilteredData( filter );
        }
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-between">
                <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-auto">
                    <Input
                        type="text"
                        placeholder="Filter for ID"
                        className="w-full p-2"
                        onChange={ ( e ) => filterById( e.target.value ) }
                    ></Input>
                </div>
                <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-auto">
                    <Input
                        type="text"
                        placeholder="Filter for Supplier"
                        className="w-full p-2"
                        onChange={ ( e ) => filterBySupplierId( e.target.value ) }
                    ></Input>
                </div>
                <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-auto">
                    <Input
                        type="date"
                        placeholder="Filter for Date"
                        className="w-full p-2"
                        onChange={ ( e ) => filterByDate( e.target.value ) }
                    ></Input>
                </div>
                <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-auto">
                    <Input
                        type="text"
                        placeholder="Filter for Recipe"
                        className="w-full p-2"
                        onChange={ ( e ) => filterByRecipe( e.target.value ) }
                    ></Input>
                </div>
                <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-auto">
                    <Select onValueChange={ ( e ) => filterByLoaded( e ) }>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Display Purchases" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="only-loaded">Only Loaded</SelectItem>
                            <SelectItem value="not-loaded">Only Not Loaded</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="p-4 w-full overflow-auto">
                { filteredData.length !== 0 ? (
                    <DataTable columns={ columns } data={ filteredData } />
                ) : (
                    <DataTable columns={ columns } data={ data } />
                ) }
            </div>
        </>
    );
}
