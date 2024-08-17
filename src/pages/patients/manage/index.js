"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import axios from "axios";
import ClientOnly from "../../../components/client-only";
import ErrorContainer from "../../../components/error-container";
import StaffTable from "../../../components/staff/staff-table";
import AppBar from "../../../components/navbar/app-bar";
import StaffTabs from "../../../components/navbar/staff/staff-tabs";

const Page = () => {
  const pathname = usePathname();
  const [allPatientsList, setAllPatientsList] = useState([]);
  console.log('global??????', global.api)
  const getAllPatient = async () => {
    try {
      // setAllPatientsList(
      //   (await axios.get("/api/patients/manage"))?.data?.data
      //     ?.filter((patientObj) => !patientObj.isDeleted)
      //     .reverse()
      // );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPatient();
  }, []);

  return (
    <>
      {!pathname.includes("/patients/edit") && (
        <ClientOnly>
          <AppBar isBack backHref="/" title="Manage Patients" />
          <StaffTabs />
        </ClientOnly>
      )}
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
