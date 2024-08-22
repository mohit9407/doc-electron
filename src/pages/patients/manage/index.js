"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { toast } from "../../../components/ui/use-toast";
import ClientOnly from "../../../components/client-only";
import ErrorContainer from "../../../components/error-container";
import StaffTable from "../../../components/staff/staff-table";
import AppBar from "../../../components/navbar/app-bar";
import StaffTabs from "../../../components/navbar/staff/staff-tabs";

const Page = () => {
  const pathname = usePathname();
  const [allPatientsList, setAllPatientsList] = useState([]);
  const router = useRouter();
  const params = router.query;

  const getAllPatient = async () => {
    try {
      const data = await global.api.sendSync("getAllPatients");
      setAllPatientsList(
        data?.data?.data
          ?.filter((patientObj) => !patientObj.isDeleted)
          .reverse() || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updatepatientInfo = async (patientInfo) => {
    const { data: updatedPatientInfo } = await global.api.sendSync(
      "putPatientData",
      patientInfo,
      {
        patientid: params?.patientid,
      }
    );
    if (updatedPatientInfo.status === 200) {
      toast({
        title: "Patient deleted successfully!",
      });
      getAllPatient();
      return true;
    }
  };

  const deletePatient = async (patientId) => {
    let localAllPatientsList = [...allPatientsList];
    const idOfPatient = localAllPatientsList.findIndex(
      (patientObj) => patientObj.id === patientId
    );
    if (idOfPatient !== -1)
      localAllPatientsList[idOfPatient] = {
        ...localAllPatientsList[idOfPatient],
        isDeleted: true,
      };
    return await updatepatientInfo(
      localAllPatientsList[idOfPatient],
      patientId
    );
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
          <StaffTable data={allPatientsList} deletePatient={deletePatient} />
        </ClientOnly>
      )}
    </>
  );
};

export default Page;
