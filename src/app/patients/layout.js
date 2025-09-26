"use client";
import { usePathname } from "next/navigation";
import ClientOnly from "@/components/client-only";
import AppBar from "@/components/navbar/app-bar";
import StaffTabs from "@/components/navbar/staff/staff-tabs";

const Layout = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      {!pathname.includes("/patients/edit") && (
        <ClientOnly>
          <AppBar isBack backHref="/" title="Manage Patients" />
          <StaffTabs />
        </ClientOnly>
      )}
      {children}
    </>
  );
};

export default Layout;
