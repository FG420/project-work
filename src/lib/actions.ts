"use server"

import { revalidatePath } from "next/cache"
import axios from "axios"

export async function createSupplier(name: string) {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier`, { description: name});
    } catch (error) {
        console.log(error)
    }
    revalidatePath("/dashboard/suppliers");
}

export async function deleteSupplier(id: string) {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier/${id}`);
    } catch (error) {
        console.log(error)
    }
    revalidatePath("/dashboard/suppliers");
}