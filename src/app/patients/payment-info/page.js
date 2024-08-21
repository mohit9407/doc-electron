"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import ClientOnly from "@/components/client-only";
import ErrorContainer from "@/components/error-container";
import PaymentsTable from "@/components/staff/payments-table";

const Page = () => {
  const [allPatientsList, setAllPatientsList] = useState([]);
  const pathname = usePathname();

  const getAllPatient = async () => {
    setAllPatientsList(
      (await axios.get("/api/patients/payments"))?.data?.data
        ?.filter((patientObj) => !patientObj.isDeleted)
        .reverse()
    );
  };

  useEffect(() => {
    getAllPatient();
  }, []);

  return <>
    <ClientOnly>
      <AppBar isBack backHref="/" title="Payment Information" />
      <PaymentsTabs />
    </ClientOnly>
    {allPatientsList?.length === 0 ? (
      <ClientOnly>
        <ErrorContainer title="No Staff" desc="No staff were found" />
      </ClientOnly>
    ) : (
      <ClientOnly>
        <PaymentsTable data={allPatientsList?.map((paymentObj) => {
          return {
            ...paymentObj,
            name: paymentObj?.patientInfo?.name,
            mobileNumber: paymentObj?.patientInfo?.mobileNumber,
          };
        })} />
      </ClientOnly>
    )
  }
  </>;
};

export default Page;
