export interface Order {
  AmazonOrderId: string;
  PurchaseDate: Date;
  OrderStatus: string;
  NumberOfItemsShipped: number;
  MarketplaceId: string;
}

export interface OrderItem {
  OrderItemId: number;
  AmazonOrderId: string;
  ASIN: string;
  Title: string;
  QuantityOrdered: number;
  ItemPrice: number;
}

export interface Marketplace {
  MarketplaceID: string;
  Marketplace: string;
  CountryCode: string;
}

export interface User {
  UserID: number;
  Email: string;
  Password: string;
  Token: string;
  Expiration: Date;
}
