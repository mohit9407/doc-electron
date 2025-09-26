"use client";
import ClientOnly from "@/components/client-only";
import AppBar from "@/components/navbar/app-bar";

const Layout = ({ children }) => {
  return (
    <>
      <ClientOnly>
        <AppBar isBack backHref="/patients/manage" title="Edit Patient" />
      </ClientOnly>
      {children}
    </>
  );
};

export default Layout;
