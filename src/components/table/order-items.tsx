"use client"

import { OrderItem } from "@/lib/types"
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "../ui/drawer";

export default function OrderItems ( { items }: { items: OrderItem[] } ) {

    const calculateTotalPrice = () => {
        return items.reduce( ( total, item ) => {
            return total + ( item.itemPrice * item.quantityOrdered );
        }, 0 )
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
                        <DrawerTitle>Prodotti Ordinati
                            <span className="ml-5 text-sm font-normal justify-between">
                                Total { new Intl.NumberFormat( "it-IT", { style: "currency", currency: "EUR" } ).format( totalPrice ) }
                            </span>
                        </DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 h-80 overflow-y-auto">
                        { items && items.length > 0 ? (
                            items.map( ( item ) => (
                                <div key={ item.orderItemID } className="border-b pb-2 mb-2">
                                    <div><strong>ASIN:</strong> { item.asin }</div>
                                    <div><strong>Title:</strong> { item.title }</div>
                                    <div><strong>Quantity Ordered:</strong> { item.quantityOrdered }</div>
                                    <div><strong>Item Price:</strong> { new Intl.NumberFormat( "it-IT", { style: "currency", currency: "EUR" } ).format( item.itemPrice ) }</div>
                                </div>
                            ) )
                        ) : (
                            <div className="text-center">No items found.</div>
                        ) }
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