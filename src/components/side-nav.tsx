'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { SidebarItems } from '@/lib/constants';
import { SidebarItem } from '@/lib/types';
import { Icon } from '@iconify/react';
import { ModeToggle } from './ui/theme-toggle';

export const SideNav = () => {
  return (
    <div className="md:w-60 h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/dashboard"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
        >
          <Image src={'/graph.png'} width={30} height={20} alt="graph-png" />
          <span className="font-bold text-xl hidden md:flex">CargoConnect</span>
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SidebarItems.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
        <div className="flex justify-center">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ item }: { item: SidebarItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg w-full justify-between ${
              pathname.includes(item.path) ? 'border-l border-r border-zinc-500' : ''
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${subItem.path === pathname ? 'font-bold' : ''}`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg ${
            item.path === pathname ? 'border-l border-r border-zinc-500' : ''
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
