"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// This type is used to define the shape of our data.
export type Orders = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  items: { productId: string, name: string, quantity: number, price: number }[]
}

export const columns: ColumnDef<Orders>[] = [
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
    id: "actions",
    cell: ({ row, table }) => {
      const payment = row.original
      const isExpanded = table.getRowModel().flatRows.some(
        (flatRow) => flatRow.id === row.id && flatRow.getIsExpanded()
      )
 
      return (
        <Collapsible open={isExpanded} onOpenChange={() => table.toggleRowsExpanded(row.id)}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
            <table className="w-full bg-gray-50 border">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {payment.items.map((item) => (
                  <tr key={item.productId}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CollapsibleContent>
      </Collapsible>
      )
    },
  },
]
