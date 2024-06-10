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
