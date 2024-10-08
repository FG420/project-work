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

    const getOrders = async () => {
        try {
            const allOrdersItems = await axiosInstanceClient.get(
                `${ process.env.NEXT_PUBLIC_BACKEND_URL }/OrderItem`
            );

            const mergedItemsMap = new Map();

            allOrdersItems.data.forEach( ( item: { title: any; quantityOrdered: any; } ) => {
                if ( mergedItemsMap.has( item.title ) ) {
                    const existingItem = mergedItemsMap.get( item.title );
                    existingItem.quantityOrdered += item.quantityOrdered;
                } else {
                    mergedItemsMap.set( item.title, { ...item } );
                }
            } );

            const mergedItemsArray = Array.from( mergedItemsMap.values() );

            const orderItemsData = mergedItemsArray.sort( ( a, b ) => b.quantityOrdered - a.quantityOrdered );

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
