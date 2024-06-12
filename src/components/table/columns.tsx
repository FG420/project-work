"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import OrderItems from "@/components/table/order-items" 
import { ChevronDown } from 'lucide-react';
import { TableRow } from "../ui/table"

export type Orders = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  items: { productId: string, name: string, quantity: number, price: number }[]
}

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    id: "expand",
    header: () => null,
    cell: ({ row }) => {
      const order = row.original
      return (
        
          <Collapsible asChild>
          <>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
              <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent asChild>
              <OrderItems items={order.items} />
            </CollapsibleContent>
          </>
        </Collapsible>
        
      )
    }
  }
]
