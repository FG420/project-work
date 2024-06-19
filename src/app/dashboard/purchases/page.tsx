'use client';

import { DataTable } from './data-table';
import { columns } from './columns';
import { Purchase } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { DialogComponent } from '@/components/dialog-trigger';
import { useEffect, useState } from 'react';
import axiosInstanceClient from '@/lib/axios-client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function PurchasePage () {

    const [ data, setData ] = useState<Purchase[]>( [] );
    const [ filteredData, setFilteredData ] = useState<Purchase[]>( [] );

    const getData = async () => {
        const allPurchases = await axiosInstanceClient.get(
            `${ process.env.NEXT_PUBLIC_BACKEND_URL }/Purchase`,
        );

        console.log( allPurchases.data )
        const purchases = allPurchases.data.map( ( purchase: any ) => ( {
            purchaseID: purchase.purchaseID,
            supplierID: purchase.supplier.description,
            purchaseDate: new Date( purchase.purchaseDate ).toISOString().split( 'T' )[ 0 ],
            recipeNumber: purchase.recipeNumber,
            isLoaded: purchase.isLoaded,
        } ) );

        setData( purchases );
        setFilteredData( purchases );
    };

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

    useEffect( () => {
        getData();
    }, [] );

    return (
        <main>
            <div className="flex justify-end items-center pr-3 pt-3">
                <div className="pb-2">
                    <DialogComponent buttonName={ 'New Purchase' } title={ 'Create a New Purchase' } />
                </div>
            </div>

            <div className="p-2 flex items-center justify-around">
                <div className="p-1">
                    <Input
                        type="text"
                        placeholder="Filter for ID"
                        className=" w-32 p-2"
                        onChange={ ( e ) => filterById( e.target.value ) }
                    ></Input>
                </div>
                <div className="p-1">
                    <Input
                        type="text"
                        placeholder="Filter for Supplier"
                        className="w-44 p-2"
                        onChange={ ( e ) => filterBySupplierId( e.target.value ) }
                    ></Input>
                </div>
                <div className="p-1">
                    <Input
                        type="date"
                        placeholder="Filter for Date"
                        className="w-34 p-2"
                        onChange={ ( e ) => filterByDate( e.target.value ) }
                    ></Input>
                </div>
                <div className="p-1">
                    <Input
                        type="text"
                        placeholder="Filter for Recipe"
                        className="w-32 lg:w-full p-2"
                        onChange={ ( e ) => filterByRecipe( e.target.value ) }
                    ></Input>
                </div>
                <div className="p-1">
                    <Select onValueChange={ ( e ) => filterByLoaded( e ) }>
                        <SelectTrigger className="w-[186px]">
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
            <div className="p-4 w-auto">
                { filteredData.length !== 0 ? (
                    <DataTable columns={ columns } data={ filteredData } />
                ) : (
                    <DataTable columns={ columns } data={ data } />
                ) }
            </div>
        </main>
    );
}
