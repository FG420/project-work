'use server';

import { revalidatePath } from 'next/cache';
import axiosInstance from './axios';

export async function createSupplier(name: string) {
  try {
    await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier`, {
      description: name,
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/suppliers');
}

export async function deleteSupplier(id: string) {
  try {
    await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier/${id}`);
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/suppliers');
}

export async function updateSupplier(id: string, newName: string) {
  try {
    axiosInstance.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier/${id}`, {
      description: newName,
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/suppliers');
}
