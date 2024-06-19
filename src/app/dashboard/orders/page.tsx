import { columns } from "../../../components/table/columns"
import { DataOrderTable } from "../../../components/table/order-data-table"
import axiosInstanceServer from "@/lib/axios-server";

/* const ordersData = [
  {
    amazonOrderID: "trial",
    purchaseDate: "2024-06-14T12:58:31.637Z",
    orderStatus: "shipping",
    numberOfItemsShipped: 2, 
    marketplaceID: "A13V1IB3VIYZZH",
    marketplace: {
      marketplaceID: "A13V1IB3VIYZZH",
      marketplaceName: "France",
      countryCode: "FR"
    },
    orderItems: [
      {
        orderItemID: "8ba8a577-2301-4b87-873d-c988ee650b3d",
        amazonOrderID: "trial",
        asin: "B08KV9NJVQ",
        title: "Warner Bros Hogwarts Legacy - PS4",
        quantityOrdered: 1,
        itemPrice: 40,
        item: {
          asin: "B08KV9NJVQ",
          title: "Warner Bros Hogwarts Legacy - PS4",
          stock: 111,
          categoryID: "ac38b4c8-7358-49fe-8316-2dd44d3add8e",
          category: null
        }
      },
      {
        orderItemID: "a2f5d6b3-7c9e-4d7e-a8a2-55e2b6f27f39",
        amazonOrderID: "trial",
        asin: "B07D3PCCQ4",
        title: "Sony PlayStation 4 - DualShock 4 Wireless Controller",
        quantityOrdered: 1,
        itemPrice: 60,
        item: {
          asin: "B07D3PCCQ4",
          title: "Sony PlayStation 4 - DualShock 4 Wireless Controller",
          stock: 200,
          categoryID: "b82b4d3c-83e9-49b9-8321-3cdd6d3bdf8e",
          category: null
        }
      },
      {
        orderItemID: "a2f5d6b3-7c9e-4d7e-a8a2-55e2b6f27f39",
        amazonOrderID: "trial",
        asin: "B07D3PCCQ4",
        title: "Sony PlayStation 4 - DualShock 4 Wireless Controller",
        quantityOrdered: 1,
        itemPrice: 60,
        item: {
          asin: "B07D3PCCQ4",
          title: "Sony PlayStation 4 - DualShock 4 Wireless Controller",
          stock: 200,
          categoryID: "b82b4d3c-83e9-49b9-8321-3cdd6d3bdf8e",
          category: null
        }
      },{
        orderItemID: "a2f5d6b3-7c9e-4d7e-a8a2-55e2b6f27f39",
        amazonOrderID: "trial",
        asin: "B07D3PCCQ4",
        title: "Sony PlayStation 4 - DualShock 4 Wireless Controller",
        quantityOrdered: 1,
        itemPrice: 60,
        item: {
          asin: "B07D3PCCQ4",
          title: "Sony PlayStation 4 - DualShock 4 Wireless Controller",
          stock: 200,
          categoryID: "b82b4d3c-83e9-49b9-8321-3cdd6d3bdf8e",
          category: null
        }
      },
      {
        orderItemID: "a2f5d6b3-7c9e-4d7e-a8a2-55e2b6f27f39",
        amazonOrderID: "trial",
        asin: "B07D3PCCQ4",
        title: "Sony PlayStation 4 - DualShock 4 Wireless Controller",
        quantityOrdered: 1,
        itemPrice: 60,
        item: {
          asin: "B07D3PCCQ4",
          title: "Sony PlayStation 4 - DualShock 4 Wireless Controller",
          stock: 200,
          categoryID: "b82b4d3c-83e9-49b9-8321-3cdd6d3bdf8e",
          category: null
        }
      },
      {
        orderItemID: "a2f5d6b3-7c9e-4d7e-a8a2-55e2b6f27f39",
        amazonOrderID: "trial",
        asin: "B07D3PCCQ4",
        title: "Sony PlayStation 4 - DualShock 4 Wireless Controller",
        quantityOrdered: 1,
        itemPrice: 60,
        item: {
          asin: "B07D3PCCQ4",
          title: "Sony PlayStation 4 - DualShock 4 Wireless Controller",
          stock: 200,
          categoryID: "b82b4d3c-83e9-49b9-8321-3cdd6d3bdf8e",
          category: null
        }
      }
    ]
  }
]; */

async function getData(){

  const res = await axiosInstanceServer.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Order`)

  return res.data
  
}

export default async function OrdersPage() {
  
  const data = await getData()
  // const data = ordersData
  // console.log(data)

  return (
    <>
      <div className="container mx-auto py-10" >
        <DataOrderTable columns={columns} data={data} />
      </div>
    </>
  );
}
