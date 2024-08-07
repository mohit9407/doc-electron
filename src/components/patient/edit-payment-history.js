import React from "react";
import PaymentTable from "./patient-payment-table";

const EditPaymentHistory = ({ patientInfo, updatePaymentHistory }) => {
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
        updatePaymentHistory={updatePaymentHistory}
      />
    </>
  );
};

export default EditPaymentHistory;
