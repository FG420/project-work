import Sidebar from "@/components/sidebar";
import React from "react";

const OrdersPageLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64" style={{ border: "1px solid red" }}>
        <Sidebar />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12" style={{padding: 0}}>{children}</div>
    </div>
  );
};

export default OrdersPageLayout;