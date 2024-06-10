import React from "react";
import { Header } from "@/components/header";
import { HeaderMobile } from "@/components/header-mobile";
import { SideNav } from "@/components/side-nav";
import PageWrapper from "@/components/page-wrapper";
import MarginWidthWrapper from "@/components/margin-width-wrapper";

const HomePageLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
};

export default HomePageLayout;
