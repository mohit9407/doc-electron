"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientOnly from "@/components/client-only";
import ErrorContainer from "@/components/error-container";
import StaffTable from "@/components/staff/staff-table";

const Page = () => {
  const [allPatientsList, setAllPatientsList] = useState([]);

  const getAllPatient = async () => {
    setAllPatientsList(await axios.get("/api/patients/manage"));
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
      <StaffTable data={allPatientsList?.data?.data} />
    </ClientOnly>
  );
};

export default Page;
