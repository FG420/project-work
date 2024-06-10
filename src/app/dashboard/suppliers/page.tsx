
import { suppliers } from "@/lib/suppliers";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Supplier } from "@/lib/interfaces";
import { Input } from "@/components/ui/input";
import { DialogComponent } from "@/components/dialog-trigger";
import { Button } from "@/components/ui/button";
import { useReactTable } from "@tanstack/react-table";

async function getData (): Promise<Supplier[]> {
    // Fetch data from your API here.
    return suppliers
}

export default async function SuppliersPage () {
    const data = await getData()

    return (
        <main>
            <div className="flex justify-end items-center pr-3">
                <div className="p-2">
                    <DialogComponent
                        buttonName={ "New Supplier" }
                        title={ "Create a New Supplier" } />
                </div>
            </div>
            <div className="flex items-center justify-between lg:justify-end">
                <div className="p-4">
                    <Input type="number" placeholder="Filter for ID" className="w-32 p-2"></Input>
                </div>
                <div className="p-4">
                    <Input type="text" placeholder="Filter for Recipe" className="w-32 lg:w-full p-2"></Input>
                </div>
            </div>
            <div className="p-4">

                <DataTable columns={ columns } data={ data } />
            </div>


        </main>
    )
}


