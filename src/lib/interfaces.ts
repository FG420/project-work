export interface Purchase {
  PurchaseID: number;
  SupplierID: number;
  RecipeDate: Date | string | number; //! ---------------
  RecipeNumber: string;
}

// Order
//! Da definire qualcosa per order scaricato o meno
export interface Order {
  AmazonOrderId: string;
  PurchaseDate: Date;
  OrderStatus: string; //? Serve???????????????????
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
