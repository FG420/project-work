"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Supplier } from "@/lib/types"
import { deleteSupplier } from "@/lib/actions"

const formSchema = z.object( {
    name: z.string()
} )

export const columns: ColumnDef<Supplier>[] = [
    {
        accessorKey: "supplierID",
        header: "ID",
    },
    {
        accessorKey: "description",
        header: "Name",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ( { row } ) => {
            const supplier = row.original

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
            const delSupplier = () => {
                deleteSupplier(supplier.supplierID)
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
                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-center">Edit Supplier</DialogTitle>
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
                        </Dialog>
                        <DropdownMenuItem onClick={ delSupplier }>Delete supplier</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]
