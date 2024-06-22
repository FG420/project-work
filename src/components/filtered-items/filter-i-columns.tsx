'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Item } from '@/lib/types';

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'category.description',
    header: 'Category',
  },
  {
    accessorKey: 'stock',
    header: 'Stock'
  }
];
