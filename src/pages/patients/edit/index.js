"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import PatientTabs from "../../../components/navbar/patient/patient-tabs";
import AddStaffForm from "../../../components/staff/add-staff-form";
import EditPatientHistory from "../../../components/patient/edit-patient-history";
import EditPaymentHistory from "../../../components/patient/edit-payment-history";
import { toast } from "../../../components/ui/use-toast";
import ClientOnly from "../../../components/client-only";
import AppBar from "../../../components/navbar/app-bar";

const getHistoryIndex = (id, patientInfo, info) => {
  return patientInfo[info].findIndex((infoObj) => infoObj.id === id);
};

const getDeleteHistoryIndex = (id, paymentInfo) => {
  return paymentInfo?.findIndex((infoObj) => infoObj?.id === id);
};

const Page = () => {
  const router = useRouter();
  const [patientInfo, setPatientInfo] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState(0);
  const [isOpenAddpayment, setIsOpenAddpayment] = useState(false);
  const params = router.query;
  const [currentTab, setCurrenttab] = useState(
    !params["isopenhistory"] ? "general-info" : "history"
  );
  const [isOpenAddHistory, setIsOpenAddHistory] = useState(
    Boolean(params["isopenhistory"])
  );

  const updatepatientInfo = async (patientInfo, isAddedHistoryOrPatient) => {
    const { data: updatedPatientInfo } = await global.api.sendSync(
      "putPatientData",
      patientInfo,
      {
        patientid: params?.patientid,
      }
    );
    if (updatedPatientInfo.status === 200) {
      setPatientInfo({ ...updatedPatientInfo.data });
      if (isAddedHistoryOrPatient === "addedHistory") {
        setIsOpenAddHistory(false);
        setCurrenttab("payments");
        setIsOpenAddpayment(true);
      } else if (isAddedHistoryOrPatient === "addedPaymentInfo")
        setIsOpenAddpayment(false);
      toast({
        title:
          (currentTab === "payments"
            ? "Payment history updated successfully!"
            : "Patient history updated successfully!")
      });
    }
  };

  const updateInvoiceNo = async (newInvoiceNo) => {
    const updatedInvoiceInfo = await global.api.sendSync("patchPatientData", {
      invoiceNo: newInvoiceNo,
    });

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
      updatepatientInfo(localPatientInfo, "addedHistory");
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
      updatepatientInfo(localPatientInfo, "addedPaymentInfo");
      updateInvoiceNo(newInvoiceNo);
    }
  };

  const deletePaymentHistoryHandler = (id) => {
    const historyIndx = getDeleteHistoryIndex(
      id,
      patientInfo?.paymentInfo,
    );

    if (historyIndx !== -1) {
      let localPatientInfo = { ...patientInfo };
      localPatientInfo.paymentInfo.splice(historyIndx, 1);
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

  const updatePatientGeneralInfo = (data) => {
    updatepatientInfo(data);
    setCurrenttab("history");
  };

  const getInvoiceNo = async () => {
    const updatedInvoiceInfo = await global.api.sendSync("getInvoiceNo");
    setInvoiceNo(updatedInvoiceInfo?.data?.invoiceNo ?? 0);
  };

  useEffect(() => {
    getInvoiceNo();
  }, []);

  const getPatientInfo = async () => {
    const { data: patientForEdit } = await global.api.sendSync(
      "getPatientInfo",
      {
        patientid: params?.patientid,
      }
    );
    if (patientForEdit.status === 200) {
      setPatientInfo({ ...patientForEdit.data });
    }
  };

  useEffect(() => {
    if (params.patientid) {
      getPatientInfo();
    }
  }, [params.patientid]);

  return (
    <>
      <ClientOnly>
        <AppBar isBack backHref="/patients/manage" title="Edit Patient" />
      </ClientOnly>
      <PatientTabs currentTab={currentTab} setActiveTab={setCurrenttab} />
      {currentTab === "general-info" && (
        <AddStaffForm
          patientinfo={patientInfo}
          updatePatientGeneralInfo={updatePatientGeneralInfo}
        />
      )}
      {currentTab === "history" && (
        <EditPatientHistory
          isOpenAddHistory={isOpenAddHistory}
          setIsOpenAddHistory={setIsOpenAddHistory}
          patientInfo={patientInfo}
          deleteHistoryHandler={deleteHistoryHandler}
          updatePatientHistory={updatePatientHistory}
        />
      )}
      {currentTab === "payments" && (
        <EditPaymentHistory
          isOpenAddpayment={isOpenAddpayment}
          setIsOpenAddpayment={setIsOpenAddpayment}
          patientInfo={patientInfo}
          updatePaymentHistory={updatePaymentHistory}
          deletePaymentHistoryHandler={deletePaymentHistoryHandler}
        />
      )}
    </>
  );
};

export default Page;
