import { Order, OrderItem } from "@/lib/interfaces";
import { columns } from "../../../components/table/columns"
import { DataOrderTable } from "../../../components/table/order-data-table"

async function getData(): Promise<{ orders: Order[]; items: OrderItem[] }> {
  // Use axios to call for the data
  const orders: Order[] = [
    {
      AmazonOrderId: "m5gr84i9",
      PurchaseDate: new Date(),
      OrderStatus: "success",
      NumberOfItemsShipped: 3,
      MarketplaceId: "ATAKAS8KX0DER",
    },
    {
      AmazonOrderId: "ff5graSGt65",
      PurchaseDate: new Date(),
      OrderStatus: "failed",
      NumberOfItemsShipped: 98,
      MarketplaceId: "AQWEDB283R",
    },
    {
      AmazonOrderId: "weds87829",
      PurchaseDate: new Date(),
      OrderStatus: "success",
      NumberOfItemsShipped: 323,
      MarketplaceId: "AQAW45DERFER",
    },
  ]

  const items: OrderItem[] = [
    { OrderItemId: 1, AmazonOrderId: "m5gr84i9", ASIN: "B07PGL2ZSL", Title: "Product 1", QuantityOrdered: 1, ItemPrice: 100 },
    { OrderItemId: 2, AmazonOrderId: "ff5graSGt65", ASIN: "B07PGL2ZSL", Title: "Product 2", QuantityOrdered: 2, ItemPrice: 50 },
    { OrderItemId: 3, AmazonOrderId: "weds87829", ASIN: "B07PGL2ZSL", Title: "Product 3", QuantityOrdered: 3, ItemPrice: 22 },
  ]

  return { orders, items }
}

export default async function OrdersPage() {
  const { orders, items } = await getData()
  // const { items } = await getData()

  const data = orders.map(order => ({
    ...order,
    Items: items.filter(item => item.AmazonOrderId === order.AmazonOrderId),
  }));

  return (
    <>
      <div className="container mx-auto py-10" >
        <DataOrderTable columns={columns} data={data} />
      </div>
    </>
  );
}
