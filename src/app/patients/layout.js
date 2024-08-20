"use client";
import { usePathname } from "next/navigation";
import ClientOnly from "@/components/client-only";
import AppBar from "@/components/navbar/app-bar";
import StaffTabs from "@/components/navbar/staff/staff-tabs";
import PaymentsTabs from "./payment-info/payments-tabs";

const Layout = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      {!pathname.includes("/patients/edit") && !pathname.includes("/patients/payment-info") && (
        <ClientOnly>
          <AppBar isBack backHref="/" title="Manage Patients" />
          <StaffTabs />
        </ClientOnly>
      )}
      

      {pathname.includes("/patients/payment-info") && (
        <ClientOnly>
          <AppBar isBack backHref="/" title="Payment Information" />
          <PaymentsTabs />
        </ClientOnly>
      )}
      {children}
    </>
  );
};

export default Layout;
