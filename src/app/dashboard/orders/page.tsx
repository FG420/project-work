import { columns } from "../../../components/table/columns"
import { DataOrderTable } from "../../../components/table/order-data-table"
import axiosInstanceServer from "@/lib/axios-server";
import { Order, OrderItem } from "@/lib/types";

async function getData(): Promise<{ orders: Order[]; items: OrderItem[] }> {

  const res = await axiosInstanceServer.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Order`)

  return res.data
  
}

export default async function OrdersPage() {
  
  const data = await getData()

  return (
    <>
      <div className="container mx-auto py-10" >
        <DataOrderTable columns={columns} data={data} />
      </div>
    </>
  );
}
