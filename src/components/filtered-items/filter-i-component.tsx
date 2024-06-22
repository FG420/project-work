'use client';

import axiosInstanceClient from '@/lib/axios-client';
import { Item } from '@/lib/types';
import { useEffect, useState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Label } from '../ui/label';
import { FilteredDataTable } from './filter-i-data-table';
import { columns } from './filter-i-columns';

export default function TopItemsComponent () {
    const [ items, setItems ] = useState<Item[]>( [] );

    const fetchItems = async () => {
        try {
            const getItems = await axiosInstanceClient.get(
                `${ process.env.NEXT_PUBLIC_BACKEND_URL }/Item`,
            );

            const itemsFilterByStock = getItems.data
                .filter( ( item: any ) => item.stock < 150 )
                .sort( ( a: any, b: any ) => b.stock - a.stock );

            setItems( itemsFilterByStock );
        } catch ( error ) {
            console.log( error );
        }
    };

    useEffect( () => {
        fetchItems();
    }, [] );

    return (
        <main className="p-4">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Items with Stock Below 150</CardTitle>
                    <CardDescription>All the items with stock lower than 150</CardDescription>
                </CardHeader>
                <CardContent>
                    <FilteredDataTable data={ items } columns={ columns } />
                </CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
            </Card>
        </main>
    );
}
