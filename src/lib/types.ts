export type CategoryNames =
  | 'Videogiochi'
  | 'Cavi e Accessori'
  | 'Caffè Tè e bevande'
  | 'Cartucce per stampanti';

export type Category = {
  categoryID: string;
  description: CategoryNames;
};

export type Item = {
  asin: string;
  title: string;
  stock: number;
  categoryID: string;
  category: Category;
};

export type Supplier = {
  supplierID: string;
  description: string;
};

export type Purchase = {
  purchaseID: string;
  supplierID: string;
  purchaseDate: Date | string | number;
  // recipeDate: Date;
  recipeNumber: string;
  isLoaded: boolean;
  purchasedItems: PurchasedItem[];
};

export type PurchasedItem = {
  purchasedItemID: string;
  purchaseID: string;
  asin: string;
  quantity: number;
  price: number;
  item: Item
}

export type User = {
  userID: string;
  email: string;
  password: string;
  token: string | null;
  tokenExpiration: string | Date | null; // ???
  ip: string; // ???
  lastLogin: string | Date | null; // ???
  loginStatus: boolean; // ???
};

export type SidebarItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SidebarItem[];
};

export type MenuItemWithSubMenuProps = {
  item: SidebarItem;
  toggleOpen: () => void;
};

export type Order = {
  amazonOrderID: string;
  purchaseDate: Date;
  orderStatus: string;
  numberOfItemsShipped: number;
  marketplaceID: string;
  marketplace: Marketplace;
  orderItems: OrderItem[];
}

export type OrderItem = {
  orderItemID: string;
  amazonOrderID: string;
  asin: string;
  title: string;
  quantityOrdered: number;
  itemPrice: number;
  item: Item;
}

export type Marketplace = {
  marketplaceID: string;
  marketplaceName: string;
  countryCode: string;
}
