'use server';

import { revalidatePath } from 'next/cache';
import axiosInstanceServer from './axios-server';

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

// TODO: To test
export async function updateItemStock(asin: string, stock: number) {
  try {
    await axiosInstanceServer.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Item/${asin}`,
      {
        stock,
      },
    );
  } catch (error) {
    console.log(error);
  }
}
