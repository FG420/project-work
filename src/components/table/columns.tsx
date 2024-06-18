'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import OrderItems from "@/components/table/order-items";
import { ChevronDown } from 'lucide-react';
import { Order, OrderItem } from "@/lib/types";

/* interface OrderWithItems extends Order {
  Items: OrderItem[];
} */

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
    accessorKey: "orderStatus",
    header: "Order Status",
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
      const order = row.original;

      return (
        <Collapsible asChild>
          <>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent asChild>
              <div className="px-4 pb-4">
                <OrderItems items={order.orderItems} />
              </div>
            </CollapsibleContent>
          </>
        </Collapsible>
      );
    },
  },
];