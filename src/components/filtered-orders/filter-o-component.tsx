'use client';

import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Order, OrderItem } from '@/lib/types';
import axiosInstanceClient from '@/lib/axios-client';
import { FilteredODataTable } from './filter-o-data-table';
import { columns } from './filter-o-colomns';

export default function SalesComponent () {
    const [ ordersItems, setOrdersItems ] = useState<OrderItem[]>( [] );

    // const getOrders = async () => {

    //     const allOrdersItems = await axiosInstanceClient.get(
    //         `${ process.env.NEXT_PUBLIC_BACKEND_URL }/OrderItem`,
    //     );

    //     console.log( allOrdersItems.data )
    //     const orderItemsData = allOrdersItems.data.sort( ( a: any, b: any ) => b.quantityOrdered - a.quantityOrdered )
    //     setOrdersItems( orderItemsData )
    // };

    const getOrders = async () => {
        try {
            const allOrdersItems = await axiosInstanceClient.get(
                `${ process.env.NEXT_PUBLIC_BACKEND_URL }/OrderItem`
            );

            // Process the data to merge items with the same title
            const mergedItemsMap = new Map();

            allOrdersItems.data.forEach( ( item: { title: any; quantityOrdered: any; } ) => {
                if ( mergedItemsMap.has( item.title ) ) {
                    const existingItem = mergedItemsMap.get( item.title );
                    existingItem.quantityOrdered += item.quantityOrdered;
                } else {
                    // Clone the item to avoid mutating the original data directly
                    mergedItemsMap.set( item.title, { ...item } );
                }
            } );

            // Convert the Map back to an array
            const mergedItemsArray = Array.from( mergedItemsMap.values() );

            // Sort the merged array by quantityOrdered
            const orderItemsData = mergedItemsArray.sort( ( a, b ) => b.quantityOrdered - a.quantityOrdered );

            // Update the state
            setOrdersItems( orderItemsData );
        } catch ( error ) {
            console.error( 'Error fetching order items:', error );
        }
    };


    useEffect( () => {
        getOrders();
    }, [] );

    return (
        <main className='p-4'>
            <Card className="">
                <CardHeader>
                    <CardTitle>Most Ordered Items</CardTitle>
                    <CardDescription>Items that are ordered the most</CardDescription>
                </CardHeader>
                <CardContent>
                    <FilteredODataTable data={ ordersItems } columns={ columns } />
                </CardContent>

                <CardFooter className="flex justify-between"></CardFooter>
            </Card>
        </main>
    );
}
