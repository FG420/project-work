"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import OrderItems from "@/components/table/order-items";
import { ChevronDown } from 'lucide-react';
import { Order, OrderItem } from "@/lib/interfaces";

interface OrderWithItems extends Order {
  Items: OrderItem[];
}

export const columns: ColumnDef<Order>[] = [

  {
    accessorKey: "AmazonOrderId",
    header: "ID Amazon",
  },
  {
    accessorKey: "PurchaseDate",
    header: "Purchase Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("PurchaseDate"));
      return date.toLocaleDateString("it-IT");
    },
  },
  {
    accessorKey: "OrderStatus",
    header: "Order Status",
  },
  {
    accessorKey: "NumberOfItemsShipped",
    header: "N. Items Shipped",
  },
  {
    accessorKey: "MarketplaceId",
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
                <OrderItems items={order.Items} />
              </div>
            </CollapsibleContent>
          </>
        </Collapsible>
      );
    },
  },
];