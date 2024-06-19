'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Item, PurchasedItem } from '@/lib/types';


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { changeLoadedPurchase, deletePurchase } from '@/lib/actions';
import axiosInstanceClient from '@/lib/axios-client';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const formSchema = z.object( {
    name: z.string(),
} );

export const columns: ColumnDef<PurchasedItem>[] = [
    {
        accessorKey: 'item.title',
        header: 'Title',
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
    },
    {
        accessorKey: 'price',
        header: 'Unit Price',
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ( { row } ) => {
            const purchasedItem = row.original;

            const [ open, setOpen ] = useState( false );

            const form = useForm<z.infer<typeof formSchema>>( {
                resolver: zodResolver( formSchema ),
                defaultValues: {
                    name: '',
                },
            } );

            

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={ `/dashboard/items/${ purchasedItem.asin }` }>View Item</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
