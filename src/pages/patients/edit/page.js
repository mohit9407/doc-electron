"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PatientTabs from "../../../components/navbar/patient/patient-tabs";
import AddStaffForm from "../../../components/staff/add-staff-form";
import EditPatientHistory from "../../../components/patient/edit-patient-history";
import EditPaymentHistory from "../../../components/patient/edit-payment-history";
import { toast } from "../../../components/ui/use-toast";

const getHistoryIndex = (id, patientInfo, info) => {
  return patientInfo[info].findIndex((infoObj) => infoObj.id === id);
};

const Page = () => {
  const [currentTab, setCurrenttab] = useState("general-info");
  const [patientInfo, setPatientInfo] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState(0);

  const params = { patientid: 123 }

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

  const updateInvoiceNo = async (newInvoiceNo) => {
    const updatedInvoiceInfo = await axios.patch(
      `/api/patients/edit/${params?.patientid}`,
      { invoiceNo: newInvoiceNo }
    );
    if (updatedInvoiceInfo.status === 200)
      setInvoiceNo(updatedInvoiceInfo.data.invoiceNo);
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
      const newInvoiceNo = invoiceNo + 1;
      localPatientInfo.paymentInfo.push({
        ...paymentData,
        invoiceNo: newInvoiceNo,
      });
      updatepatientInfo(localPatientInfo);
      updateInvoiceNo(newInvoiceNo);
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

  const updatePatientGeneralInfo = (data) => {
    updatepatientInfo(data);
    setCurrenttab("history");
  };

  const getInvoiceNo = async () => {
    setInvoiceNo((await axios.get("/api/patients/new"))?.data?.invoiceNo ?? 0);
  };

  useEffect(() => {
    getInvoiceNo();
  }, []);

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
          patientinfo={patientInfo}
          updatePatientGeneralInfo={updatePatientGeneralInfo}
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
