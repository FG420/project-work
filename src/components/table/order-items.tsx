"use client"

import { TableCell, TableRow } from "@/components/ui/table"
import { OrderItem } from "@/lib/types"

export default function OrderItems({ items }: {items: OrderItem[]}) {
  return (
    <>
      {items && items.length > 0 ? (
        items.map((item) => (
          <TableRow key={item.orderItemID}>
            <TableCell>{item.amazonOrderID}</TableCell>
            <TableCell>{item.asin}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.quantityOrdered}</TableCell>
            <TableCell>
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.itemPrice)}
            </TableCell>
          </TableRow>
        ))
      ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">No items found.</TableCell>
          </TableRow>
      )}
    </>
  )
}