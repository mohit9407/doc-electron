"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientOnly from "@/components/client-only";
import ErrorContainer from "@/components/error-container";
import PaymentsTable from "@/components/staff/payments-table";

const Page = () => {
  const [allPatientsList, setAllPatientsList] = useState([]);

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

  return allPatientsList?.length === 0 ? (
    <ClientOnly>
      <ErrorContainer title="No Staff" desc="No staff were found" />
    </ClientOnly>
  ) : (
    <ClientOnly>
      <PaymentsTable data={allPatientsList} />
    </ClientOnly>
  );
};

export default Page;
