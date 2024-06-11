// TODO: Da ridefinire le interfacce quando le API saranno pronte

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
    id: number;
    name: string;
    // SupplierID: number;
    // Description: string;

}

export interface Purchase {
    id: number;
    supplierId: number;
    recipeDate: number | string;
    recipe: string;

    // PurchaseID: number;
    // SupplierID: number;
    // RecipeDate: Date;
    // RecipeNumber: string;

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
