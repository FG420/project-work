'use server';

import { revalidatePath } from 'next/cache';
import axiosInstanceServer from './axios-server';
import { Purchase } from './types';


// Suppliers Functions

export async function createSupplier(name: string) {
  try {
    await axiosInstanceServer.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier`, {
      description: name,
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/suppliers');
}

export async function deleteSupplier(id: string) {
  try {
    await axiosInstanceServer.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier/${id}`,
    );
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/suppliers');
}

export async function updateSupplier(id: string, newName: string) {
  try {
    axiosInstanceServer.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier/${id}`, {
      description: newName,
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/suppliers');
}



// Purchases Functions

export async function deletePurchase(id: string) {
  try {
    axiosInstanceServer.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Purchase/${id}`)
  } catch (error) {
    console.log(error)
  }
  revalidatePath('/dashboard/purchases')
}

export async function changeLoadedPurchase(id: string, loaded: true) {
  try {
    const call = axiosInstanceServer.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Purchase/${id}`, {
      isLoaded: true
    })
  } catch (error) {
    console.log(error)
  }
  revalidatePath('/dashboard/purchases')
}
