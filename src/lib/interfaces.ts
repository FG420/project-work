//! Da vedere se si può cambiare il nome in qualcosa di più significativo alcune proprietà e/o anche il pascal case

// TODO 1. Decidere Struttura Pagina Home

//! Avvisare Gruppo Backend
// TODO 2. Per ogni tentativo di accesso memorizzare in una Tabella del database l’indirizzo IP, data/ora e se l'accesso è valido oppure no
export interface Item {
  ASIN: string;
  Title: string;
  Stock: number;
  CategoryID: number;
}

export interface Category {
  CategoryID: number;
  Description: string;
}

export interface Supplier {
  SupplierID: number;
  Description: string;
}

export interface Purchase {
  PurchaseID: number;
  SupplierID: number;
  RecipeDate: Date;
  RecipeNumber: string;
}

export interface PurchasedItem {
  PurchasedItemID: number;
  PurchaseID: number;
  ASIN: number;
  Quantity: number;
  Price: number;
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
