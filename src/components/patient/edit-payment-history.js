import React from "react";
import PaymentTable from "./patient-payment-table";
import { dateFormat } from "../../lib/utils";

const EditPaymentHistory = ({
  isOpenAddpayment = false,
  setIsOpenAddpayment = () => {},
  patientInfo,
  updatePaymentHistory,
  deletePaymentHistoryHandler
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
        isOpenAddpayment={isOpenAddpayment}
        setIsOpenAddpayment={setIsOpenAddpayment}
        patientInfo={patientInfo}
        data={paymentWithDateTime.reverse()}
        updatePaymentHistory={updatePaymentHistory}
        deletePaymentHistoryHandler={deletePaymentHistoryHandler}
      />
    </>
  );
};

export default EditPaymentHistory;
