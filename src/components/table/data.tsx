"use client"
import fs from 'fs'
import path from 'path'
import { Orders } from './columns'

export async function getData(): Promise<Orders[]> {
  const filePath = path.resolve('../../lib/orders.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const orders: Orders[] = JSON.parse(fileContents)

  const uniqueOrders = Array.from(new Map(orders.map(order => [order.id, order])).values())

  return uniqueOrders
}