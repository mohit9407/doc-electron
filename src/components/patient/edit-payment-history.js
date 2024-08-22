import React from "react";
import PaymentTable from "./patient-payment-table";
import { dateFormat } from "../../lib/utils";

const EditPaymentHistory = ({
  isOpenAddpayment = false,
  setIsOpenAddpayment = () => {},
  patientInfo,
  updatePaymentHistory,
}) => {
  const paymentWithDateTime = patientInfo?.paymentInfo
    ?.filter((paymentObj) => !paymentObj.isDeleted)
    .map((paymentObj) => {
      return {
        ...paymentObj,
        displayDate: dateFormat(paymentObj.date) 
      };
    });

  return (
    <>
      <PaymentTable
        patientInfo={patientInfo}
        isOpenAddpayment={isOpenAddpayment}
        setIsOpenAddpayment={setIsOpenAddpayment}
        data={paymentWithDateTime.reverse()}
        updatePaymentHistory={updatePaymentHistory}
      />
    </>
  );
};

export default EditPaymentHistory;
