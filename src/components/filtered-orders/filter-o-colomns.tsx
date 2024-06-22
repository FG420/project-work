'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Item, OrderItem } from '@/lib/types';

export const columns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: 'asin',
    header: 'ASIN'
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'quantityOrdered',
    header: 'Quantity',
  }
];
