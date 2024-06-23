'use client';

import { ColumnDef } from "@tanstack/react-table";
import OrderItems from "@/components/table/order-items";
import { Order, OrderItem } from "@/lib/types";
import { format } from "date-fns";
import { it } from "date-fns/locale"

export const columns: ColumnDef<Order>[] = [

    {
        accessorKey: "amazonOrderID",
        header: "ID Amazon",
    },
    {
        accessorKey: "purchaseDate",
        header: "Purchase Date",
        cell: ( { row } ) => {
            const date = new Date( row.getValue( "purchaseDate" ) );

            const formattedDate = format(date, "dd/MM/yyyy", { locale: it})

            return formattedDate;
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
        cell: ( { row } ) => {
            return <OrderItems items={ row.original.orderItems } />;
        },
    },
];