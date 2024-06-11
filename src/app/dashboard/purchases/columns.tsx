"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Purchase } from "@/lib/interfaces"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


const formSchema = z.object( {
    name: z.string()
} )


export const columns: ColumnDef<Purchase>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "supplierId",
        header: "Supplier ID",
    },
    {
        accessorKey: "recipeDate",
        header: "Date of Purchase",
    },
    {
        accessorKey: "recipe",
        header: "Recipe",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ( { row } ) => {
            const purchase = row.original


            const form = useForm<z.infer<typeof formSchema>>( {
                resolver: zodResolver( formSchema ),
                defaultValues: {
                    name: '',
                },
            } )

            function onSubmit ( values: z.infer<typeof formSchema> ) {
                // Do something with the form values.
                // ✅ This will be type-safe and validated.
                try {
                    console.log( values )
                } catch ( error ) {
                    console.log( error );
                }
            }

            // Delete function working using the row supplier.id for verificatiion! 
            const deletePurchase = () => {
                // API call for purchase deletion
                console.log( purchase.id )
            }


            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem><Link href={`/dashboard/purchases/${purchase.id}`}>View Items</Link></DropdownMenuItem>
                        {/* <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem>Edit Purchase</DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-center">Edit Purchase</DialogTitle>
                                </DialogHeader>
                                <Form { ...form }>
                                    <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-8">
                                        <FormField
                                            control={ form.control }
                                            name="name"
                                            render={ ( { field } ) => (
                                                <FormItem>
                                                    <FormLabel className="p-2">Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Change the supplier name" type="text" { ...field } />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            ) } />
                                        <div className="flex justify-center ">
                                            <Button type="submit" >Edit</Button>
                                        </div>
                                    </form>
                                </Form>

                            </DialogContent>
                        </Dialog> */}
                        <DropdownMenuItem onClick={ deletePurchase }>Delete Purchase</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
