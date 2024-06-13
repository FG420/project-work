"use client"

import { TableCell, TableRow } from "@/components/ui/table"
import { OrderItem } from "@/lib/interfaces"



export default function OrderItems({ items }: {items: OrderItem[]}) {
  return (
    <>
      {items && items.length > 0 ? (
        items.map((item) => (
          <TableRow key={item.OrderItemId}>
            <TableCell>{item.AmazonOrderId}</TableCell>
            <TableCell>{item.ASIN}</TableCell>
            <TableCell>{item.Title}</TableCell>
            <TableCell>{item.QuantityOrdered}</TableCell>
            <TableCell>
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.ItemPrice)}
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