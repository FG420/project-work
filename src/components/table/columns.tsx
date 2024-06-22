'use client';

import { ColumnDef } from "@tanstack/react-table";
import OrderItems from "@/components/table/order-items";
import { Order, OrderItem } from "@/lib/types";

export const columns: ColumnDef<Order>[] = [

  {
    accessorKey: "amazonOrderID",
    header: "ID Amazon",
  },
  {
    accessorKey: "purchaseDate",
    header: "Purchase Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("purchaseDate"));
      return date.toLocaleDateString("it-IT");
    },
  },
  {
    accessorKey: "numberOfItemsShipped",
    header: "N. Items Shipped",
  },
  {
    accessorKey: "marketplaceID",
    header: "Marketplace Id",
  },
  {
    id: "expand",
    header: () => null,
    cell: ({ row }) => {
      return <OrderItems items={row.original.orderItems} />;
    },
  },
];