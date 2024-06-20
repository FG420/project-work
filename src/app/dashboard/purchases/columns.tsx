'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Purchase, PurchasedItem } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { changeLoadedPurchase, deletePurchase, getPurchasedItems } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useEffect, useState } from 'react';

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
    accessorKey: 'purchasedItems',
    header: 'N° of Items'
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const purchase = row.original;

      // const [open, setOpen] = useState(false);
      const [data, setData] = useState<PurchasedItem[]>([]);
      const [price, setPrice] = useState<number>();

      const delPurchase = async () => {
        await deletePurchase(purchase.purchaseID);
      };

      const changeLoaded = async () => {
        await changeLoadedPurchase(purchase.purchaseID);
      };

      const getPItems = async () => {
        const getId = await getPurchasedItems(purchase.purchaseID);
        setData(getId.purchasedItems);
        // setOpen(false);

        setPrice(
          getId.purchasedItems
            .map((item: any) => item.price * item.quantity)
            .reduce((partial: any, a: any) => partial + a, 0),
        );
      };

      useEffect(() => {
        getPItems();
      }, []);

      return (
        <DropdownMenu>
          <Drawer>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
                <DrawerTrigger asChild>
              <DropdownMenuItem className="hover:cursor-pointer">
                View Items
              </DropdownMenuItem>
                </DrawerTrigger>
              {purchase.isLoaded === false ? (
                <DropdownMenuItem className="hover:cursor-pointer" onClick={changeLoaded}>
                  Load Purchase
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem className="hover:cursor-pointer" onClick={delPurchase}>
                Delete Purchase
              </DropdownMenuItem>
            </DropdownMenuContent>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle className='flex justify-between items-center'>
                    Purchased Items
                    <span className="ml-5 text-lg font-normal justify-between">
                      Total{' '}
                      {new Intl.NumberFormat('it-IT', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(price!)}
                    </span>
                  </DrawerTitle>
                  {/* <DrawerDescription></DrawerDescription> */}
                </DrawerHeader>
                <div className="p-4 h-80 overflow-y-auto">
                  {data && data.length > 0 ? (
                    data.map((purchase) => (
                      <div key={purchase.item.asin} className="border-b pb-2 mb-2">
                        <div>
                          <strong>ASIN:</strong> {purchase.asin}
                        </div>
                        <div>
                          <strong>Title:</strong> {purchase.item.title}
                        </div>
                        <div>
                          <strong>Quantity Ordered:</strong> {purchase.quantity}
                        </div>
                        <div>
                          <strong>Item Price:</strong>{' '}
                          {new Intl.NumberFormat('it-IT', {
                            style: 'currency',
                            currency: 'EUR',
                          }).format(purchase.price)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">No items found.</div>
                  )}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </DropdownMenu>
      );
    },
  },
];
