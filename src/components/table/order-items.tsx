"use client"

import { OrderItem } from "@/lib/types"
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "../ui/drawer";

export default function OrderItems({ items }: {items: OrderItem[]}) {

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + (item.itemPrice * item.quantityOrdered);
    }, 0)
  }
  const totalPrice = calculateTotalPrice()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
<<<<<<< HEAD
            <DrawerTitle>Order Items
              <span className="ml-5 text-sm font-normal justify-between">
                 Totale {new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(totalPrice)}
              </span>
            </DrawerTitle>
            <DrawerDescription>Prodotti Ordinati</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 h-80 overflow-y-auto">
=======
            <DrawerTitle>Order Items</DrawerTitle>
            <DrawerDescription>List of items in the order</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 h-80 overflow-y-auto" >
>>>>>>> main
            {items && items.length > 0 ? (
              items.map((item) => (
                <div key={item.orderItemID} className="border-b pb-2 mb-2">
                  <div><strong>ASIN:</strong> {item.asin}</div>
                  <div><strong>Title:</strong> {item.title}</div>
                  <div><strong>Quantity Ordered:</strong> {item.quantityOrdered}</div>
<<<<<<< HEAD
                  <div><strong>Item Price:</strong> {new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(item.itemPrice)}</div>
=======
                  <div><strong>Item Price:</strong> {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.itemPrice)}</div>
>>>>>>> main
                </div>
              ))
            ) : (
              <div className="text-center">No items found.</div>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}