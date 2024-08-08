"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PatientTabs from "@/components/navbar/patient/patient-tabs";
import AddStaffForm from "@/components/staff/add-staff-form";
import EditPatientHistory from "@/components/patient/edit-patient-history";
import EditPaymentHistory from "@/components/patient/edit-payment-history";
import { toast } from "@/components/ui/use-toast";

const getHistoryIndex = (id, patientInfo, info) => {
  return patientInfo[info].findIndex((infoObj) => infoObj.id === id);
};

const Page = ({ params }) => {
  const [currentTab, setCurrenttab] = useState("general-info");
  const [patientInfo, setPatientInfo] = useState(null);

  const updatepatientInfo = async (patientInfo) => {
    const updatedPatientInfo = await axios.put(
      `/api/patients/edit/${params?.patientid}`,
      patientInfo
    );
    if (updatedPatientInfo.status === 200) {
      setPatientInfo({ ...updatedPatientInfo.data.data });
      toast({
        title: "Patient updated successfully!",
      });
    }
  };

  const updatePatientHistory = (id, historyData) => {
    const historyIndx = getHistoryIndex(id, patientInfo, "historyInfo");
    let localPatientInfo = { ...patientInfo };
    if (historyIndx !== -1) {
      localPatientInfo.historyInfo[historyIndx] = {
        ...localPatientInfo.historyInfo[historyIndx],
        ...historyData,
      };
      updatepatientInfo(localPatientInfo);
    } else if (id === null) {
      localPatientInfo.historyInfo.push(historyData);
      updatepatientInfo(localPatientInfo);
    }
  };

  const updatePaymentHistory = (id, paymentData) => {
    const paymentIndx = getHistoryIndex(id, patientInfo, "paymentInfo");
    let localPatientInfo = { ...patientInfo };
    if (paymentIndx !== -1) {
      localPatientInfo.paymentInfo[paymentIndx] = {
        ...localPatientInfo.paymentInfo[paymentIndx],
        ...paymentData,
      };
      updatepatientInfo(localPatientInfo);
    } else if (id === null) {
      localPatientInfo.paymentInfo.push(paymentData);
      updatepatientInfo(localPatientInfo);
    }
  };

  const deleteHistoryHandler = (id) => {
    const historyIndx = getHistoryIndex(id, patientInfo, "historyInfo");
    if (historyIndx !== -1) {
      let localPatientInfo = { ...patientInfo };
      localPatientInfo.historyInfo.splice(historyIndx, 1);
      updatepatientInfo(localPatientInfo);
    }
  };

  const getPatientInfo = async () => {
    const patientForEdit = await axios.get(
      `/api/patients/edit/${params?.patientid}`
    );
    if (patientForEdit.status === 200) {
      setPatientInfo({ ...patientForEdit.data.data });
    }
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
          patientInfo={patientInfo}
          deleteHistoryHandler={deleteHistoryHandler}
          updatePatientHistory={updatePatientHistory}
        />
      )}
      {currentTab === "payments" && (
        <EditPaymentHistory
          patientInfo={patientInfo}
          updatePaymentHistory={updatePaymentHistory}
        />
      )}
    </>
  );
};

export default Page;
