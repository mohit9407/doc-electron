import React from "react";
import PaymentTable from "./patient-payment-table";

const EditPaymentHistory = ({
  patientInfo,
  deletePaymentHandler,
  updatePaymentHistory,
}) => {
  const paymentWithDateTime = patientInfo?.paymentInfo.map((paymentObj) => {
    const localDate = new Date(paymentObj.date);
    const localDateStr = localDate.toLocaleDateString();
    const localTimeStr = localDate.toLocaleTimeString();
    return {
      ...paymentObj,
      displayDate: `${localDateStr} ${localTimeStr}`,
    };
  });

  return (
    <>
      <PaymentTable
        data={paymentWithDateTime}
        deletePaymentHandler={deletePaymentHandler}
        updatePaymentHistory={updatePaymentHistory}
      />
    </>
  );
};

export default EditPaymentHistory;
