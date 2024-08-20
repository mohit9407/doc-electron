"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientOnly from "@/components/client-only";
import ErrorContainer from "@/components/error-container";
import StaffTable from "@/components/staff/staff-table";
import { toast } from "@/components/ui/use-toast";

const Page = () => {
  const [allPatientsList, setAllPatientsList] = useState([]);

  const getAllPatient = async () => {
    try {
      setAllPatientsList(
        (await axios.get("/api/patients/manage"))?.data?.data.reverse()
      );
    } catch (e) {
      console.log("error: ", e?.message);
      setAllPatientsList([]);
    }
  };

  const updatepatientInfo = async (patientInfo, patientId) => {
    const updatedPatientInfo = await axios.put(
      `/api/patients/edit/${patientId}`,
      patientInfo
    );
    if (updatedPatientInfo.status === 200) {
      toast({
        title: "Patient deleted successfully!",
      });
      getAllPatient();
      return true;
    }
  };

  const deletePatient = (patientId) => {
    let localAllPatientsList = [...allPatientsList];
    const idOfPatient = localAllPatientsList.findIndex(
      (patientObj) => patientObj.id === patientId
    );
    if (idOfPatient !== -1)
      localAllPatientsList[idOfPatient] = {
        ...localAllPatientsList[idOfPatient],
        isDeleted: true,
      };
    return updatepatientInfo(localAllPatientsList[idOfPatient], patientId);
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
      <StaffTable data={allPatientsList} deletePatient={deletePatient} />
    </ClientOnly>
  );
};

export default Page;
