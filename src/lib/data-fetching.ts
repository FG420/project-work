import axiosInstanceServer from './axios-server';
import { Item, Supplier } from './types';
import { unstable_noStore as noStore } from 'next/cache';

export async function getSuppliers() {
  noStore();
  const response = await axiosInstanceServer.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier`,
  );

  const suppliers: Supplier[] = response.data;
  return suppliers;
}

export async function getItems() {
  noStore();
  const response = await axiosInstanceServer.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Item`,
  );

  const items: Item[] = response.data;
  return items;
}

export async function getPurchases() {
  const response = await axiosInstanceServer.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Purchase`,
  );

  return response.data;
}
