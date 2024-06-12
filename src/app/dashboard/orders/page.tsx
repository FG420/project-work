"use client"
import { useState } from "react"
import { Orders, columns } from "../../../components/table/columns"
import { DataOrderTable } from "../../../components/table/order-data-table"

async function getData(): Promise<Orders[]> {
  return [ 
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
      items: [
        { "productId": "p1", "name": "Product 1", "quantity": 1, "price": 100 },
        { "productId": "p2", "name": "Product 2", "quantity": 2, "price": 50 },
        { "productId": "p3", "name": "Product 3", "quantity": 3, "price": 22 }
      ]
      items: [
        { "productId": "p1", "name": "Product 1", "quantity": 1, "price": 100 },
        { "productId": "p2", "name": "Product 2", "quantity": 2, "price": 50 },
        { "productId": "p3", "name": "Product 3", "quantity": 3, "price": 22 }
      ]
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
      items: [
        { "productId": "p4", "name": "Product 4", "quantity": 1, "price": 60 },
        { "productId": "p5", "name": "Product 5", "quantity": 2, "price": 70 },
        { "productId": "p6", "name": "Product 6", "quantity": 3, "price": 37 }
      ]

      items: [
        { "productId": "p4", "name": "Product 4", "quantity": 1, "price": 60 },
        { "productId": "p5", "name": "Product 5", "quantity": 2, "price": 70 },
        { "productId": "p6", "name": "Product 6", "quantity": 3, "price": 37 }
      ]

    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
      items: [
        { "productId": "p7", "name": "Product 7", "quantity": 1, "price": 300 },
        { "productId": "p8", "name": "Product 8", "quantity": 2, "price": 200 },
        { "productId": "p9", "name": "Product 9", "quantity": 3, "price": 79 }
      ]

      items: [
        { "productId": "p7", "name": "Product 7", "quantity": 1, "price": 300 },
        { "productId": "p8", "name": "Product 8", "quantity": 2, "price": 200 },
        { "productId": "p9", "name": "Product 9", "quantity": 3, "price": 79 }
      ]

    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
      items: [
        { "productId": "p10", "name": "Product 10", "quantity": 1, "price": 400 },
        { "productId": "p11", "name": "Product 11", "quantity": 2, "price": 250 },
        { "productId": "p12", "name": "Product 12", "quantity": 3, "price": 74 }
      ]

      items: [
        { "productId": "p10", "name": "Product 10", "quantity": 1, "price": 400 },
        { "productId": "p11", "name": "Product 11", "quantity": 2, "price": 250 },
        { "productId": "p12", "name": "Product 12", "quantity": 3, "price": 74 }
      ]

    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
      items: [
        { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
        { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
        { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
      ]

      items: [
        { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
        { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
        { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
      ]

    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]

    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
      items: [
      { "productId": "p13", "name": "Product 13", "quantity": 1, "price": 300 },
      { "productId": "p14", "name": "Product 14", "quantity": 2, "price": 200 },
      { "productId": "p15", "name": "Product 15", "quantity": 3, "price": 73 }
    ]
  },
  ]
}

export default async function OrdersPage() {
  const data = await getData()
  const [expandedRows, setExpandedRows] = useState<string[]>([])

  const handleExpand = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  return (
    <>
      <div className="container mx-auto py-10" >
        <DataOrderTable 
          columns={columns} 
          data={data} 
          expandedRows={expandedRows} 
          handleExpand={handleExpand}/>
      </div>
    </>
    
  )
}
