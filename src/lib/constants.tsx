import { Icon } from '@iconify/react';
import { SidebarItem } from './types';

export const SidebarItems: SidebarItem[] = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <Icon icon="bi:house-fill" />,
    submenu: false,
  },
  {
    title: 'Items',
    path: '/dashboard/items',
    icon: <Icon icon="bi:box" />,
    submenu: false,
  },
  {
    title: 'Suppliers',
    path: '/dashboard/suppliers',
    icon: <Icon icon="bi:people-fill" />,
    submenu: false,
  },
  {
    title: 'Purchases',
    path: '/dashboard/purchases',
    icon: <Icon icon="bi:cart-fill" />,
    submenu: false,
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: <Icon icon="bi:clipboard" />,
    submenu: false,
  },
  {
    title: 'Export Data',
    path: '/dashboard/export-data',
    icon: <Icon icon="bi:file-earmark-arrow-down-fill" />,
    submenu: false,
  },
  {
    title: 'Analysis',
    path: 'analysis',
    icon: <Icon icon="bi:bar-chart-fill" />,
    submenu: true,
    subMenuItems: [
      {
        title: 'Sales Analysis',
        path: '/dashboard/sales-analysis',
      },
      {
        title: 'Purchases Analysis',
        path: '/dashboard/purchases-analysis',
      },
    ],
  },
];
