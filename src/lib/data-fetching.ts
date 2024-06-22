import axiosInstanceServer from './axios-server';
import { Item, Supplier } from './types';
import { unstable_noStore as noStore } from 'next/cache';

export async function getSuppliers() {
  noStore();
  const res = await axiosInstanceServer.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Supplier`,
  );

  const suppliers: Supplier[] = res.data;
  return suppliers;
}

export async function getItems() {
  noStore();
  const res = await axiosInstanceServer.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Item`,
  );

  const items: Item[] = res.data;
  return items;
}

export async function getPurchases() {
  noStore();
  const res = await axiosInstanceServer.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Purchase`,
  );

  return res.data;
}

export async function getOrders() {
  noStore();
  const res = await axiosInstanceServer.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Order`,
  );

  return res.data;
}

export async function getItem(asin: string) {
  noStore();
  const res = await axiosInstanceServer.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Item/${asin}`,
  );

  return res.data;
}
