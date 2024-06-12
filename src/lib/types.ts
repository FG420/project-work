export type CategoryNames = "Videogiochi" | "Cavi e Accessori" | "Caffè Tè e bevande" | "Cartucce per stampanti";

export type Item = {
  asin: string;
  title: string;
  stock: number;
  categoryID: string;
  categoryName: CategoryNames;
};

export type Supplier = {
  supplierID: string;
  description: string;
};

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
