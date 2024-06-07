"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Purchase } from "@/lib/interfaces"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


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

]
