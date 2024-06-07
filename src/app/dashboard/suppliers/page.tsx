
import { SupplierT, suppliers } from "@/lib/suppliers";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function getData (): Promise<SupplierT[]> {
    // Fetch data from your API here.
    return suppliers
}

export default async function Suppliers () {
    const data = await getData()
    return (
        <main>
            <DataTable columns={ columns } data={ data } />

        </main>
    )
}


