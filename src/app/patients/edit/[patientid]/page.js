"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PatientTabs from "@/components/navbar/patient/patient-tabs";
import AddStaffForm from "@/components/staff/add-staff-form";
import EditPatientHistory from "@/components/patient/edit-patient-history";

const Page = ({ params }) => {
  const [currentTab, setCurrenttab] = useState("general-info");
  const [patientInfo, setPatientInfo] = useState(null);

  const getPatientInfo = async () => {
    const patientForEdit = await axios.get(
      `/api/patients/edit/${params?.patientid}`
    );
    if (patientForEdit.status === 200)
      setPatientInfo({ ...patientForEdit.data.data });
  };

  useEffect(() => {
    if (params.patientid) {
      getPatientInfo();
    }
  }, [params.patientid]);

  return (
    <>
      <PatientTabs currentTab={currentTab} setActiveTab={setCurrenttab} />
      {currentTab === "general-info" && (
        <AddStaffForm
          setpatientinfo={setPatientInfo}
          patientinfo={patientInfo}
          setFormStep={0}
        />
      )}
      {currentTab === "history" && (
        <EditPatientHistory
          setPatientInfo={setPatientInfo}
          patientInfo={patientInfo}
        />
      )}
    </>
  );
};

export default Page;
