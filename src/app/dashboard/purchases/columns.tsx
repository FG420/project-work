'use client';

import { ColumnDef } from '@tanstack/react-table';
// import { Purchase } from '@/lib/interfaces';
import { Purchase } from '@/lib/types';

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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const formSchema = z.object( {
    name: z.string(),
} );

export const columns: ColumnDef<Purchase>[] = [
    {
        accessorKey: 'purchaseID',
        header: 'ID',
    },
    {
        accessorKey: 'supplierID',
        header: 'Supplier',
    },
    {
        accessorKey: 'purchaseDate',
        header: 'Date of Purchase',
    },
    {
        accessorKey: 'recipeNumber',
        header: 'Recipe',
    },
    {
        accessorKey: 'isLoaded',
        header: 'Loaded',
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ( { row } ) => {
            const purchase = row.original;

            const [ open, setOpen ] = useState( false );

            const form = useForm<z.infer<typeof formSchema>>( {
                resolver: zodResolver( formSchema ),
                defaultValues: {
                    name: '',
                },
            } );

            function onSubmit ( values: z.infer<typeof formSchema> ) {
                // Do something with the form values.
                // ✅ This will be type-safe and validated.
                try {
                    console.log( values );
                } catch ( error ) {
                    console.log( error );
                }
            }

            const delPurchase = () => {
                deletePurchase( purchase.purchaseID );
            };

            const changeLoaded = () => {
                changeLoadedPurchase( purchase.purchaseID )
            }

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
                            <Link href={ `/dashboard/purchases/${ purchase.purchaseID }` }>View Items</Link>
                        </DropdownMenuItem>
                        { purchase.isLoaded === false ? (
                            <DropdownMenuItem
                                className="hover:cursor-pointer"
                                onClick={ changeLoaded }
                            >Load Purchase</DropdownMenuItem>
                        ) : null }
                        <DropdownMenuItem className="hover:cursor-pointer" onClick={ delPurchase }>
                            Delete Purchase
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
