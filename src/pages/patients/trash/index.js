"use client";
import React, { useEffect, useState } from "react";
import ClientOnly from "../../../components/client-only";
import AppBar from "../../../components/navbar/app-bar";
import ErrorContainer from "../../../components/error-container";
import StaffTable from "../../../components/staff/staff-table";
import StaffTabs from "../../../components/navbar/staff/staff-tabs";

const Page = () => {
  const [allPatientsList, setAllPatientsList] = useState([]);

  const getAllPatient = async () => {
    try {
      const data = await global.api.sendSync("getAllTrashs");
      setAllPatientsList(data?.data?.data?.reverse() || []);
    } catch (e) {
      console.log("error: ", e?.message);
      setAllPatientsList([]);
    }
  };

  useEffect(() => {
    getAllPatient();
  }, []);

  return (
    <>
      <ClientOnly>
        <AppBar isBack backHref="/" title="Manage Patients" />
        <StaffTabs />
      </ClientOnly>
      {allPatientsList?.length === 0 ? (
        <ClientOnly>
          <ErrorContainer title="No Staff" desc="No staff were found" />
        </ClientOnly>
      ) : (
        <ClientOnly>
          <StaffTable data={allPatientsList} />
        </ClientOnly>
      )}
    </>
  );
};

export default Page;
