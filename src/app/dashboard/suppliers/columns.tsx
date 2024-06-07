"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SupplierT } from "@/lib/suppliers"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<SupplierT>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },

]
