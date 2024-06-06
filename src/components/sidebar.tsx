"use client";

import { Button } from "./ui/button";
import "./sidebar.css";
import { ModeToggle } from "./ui/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Items", path: "/dashboard/items" },
  { name: "Suppliers", path: "/dashboard/suppliers" },
  { name: "Purchases", path: "/dashboard/purchases" },
  { name: "Orders", path: "/dashboard/orders" },
  { name: "Sales Analysis", path: "/dashboard/sales-analysis" },
  { name: "Purchases Analysis", path: "/dashboard/purchases-analysis" }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <div className="sidebar">
        {links.map((link) => {
          return (
            <Link
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 sidebar-btn",
                {
                  "bg-sky-100 text-blue-600": pathname === link.path
                }
              )}
              key={link.name}
              href={link.path}
            >
              <p>{link.name}</p>
            </Link>
          );
        })}

        <div className="lower-sidebar">
          <div className="toggle">
            <ModeToggle />
          </div>

          <Button id="sign-out-btn" className="sign-out-btn sidebar-btn" variant={"outline"}>
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
}
