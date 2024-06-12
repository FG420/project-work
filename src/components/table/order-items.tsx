"use client"

import { TableCell, TableRow } from "@/components/ui/table"

interface OrderItemsProps {
  items: { productId: string, name: string, quantity: number, price: number }[]
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <>
      {items ? (
        items.map((item) => (
          <TableRow key={item.productId}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price)}
            </TableCell>
          </TableRow>
        ))
      ) : null}
    </>
  )
}