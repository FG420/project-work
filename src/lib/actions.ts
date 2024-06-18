'use server';

import { revalidatePath } from 'next/cache';
import axiosInstanceServer from './axios-server';
import { redirect } from 'next/navigation';

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
    await axiosInstanceServer.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier/${id}`,
      {
        description: newName,
      },
    );
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/suppliers');
}

export async function changePassword(oldPassword: string, newPassword: string) {
  try {
    const result = await axiosInstanceServer.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Authentication/Change-Password`,
      {
        newPassword,
        oldPassword,
      },
    );

    if (result.status !== 200) {
      throw new Error('Error changing password');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateItemStock(asin: string, stock: number) {
  try {
    await axiosInstanceServer.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Item/${asin}`, {
      stock,
    });
  } catch (error) {
    console.log(error);
  }

  redirect(`/dashboard/items/`);
}

export async function addItem(
  itemName: string,
  asin: string,
  stock: number,
  category: string,
) {
  try {
    await axiosInstanceServer.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Item`, {
      asin,
      title: itemName,
      stock,
      categoryID: category,
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/dashboard/items');
}
