import React from "react";
import PaymentTable from "./patient-payment-table";
import moment from "moment";

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
        displayDate: moment(paymentObj.date).format("DD-MM-YYYY HH:mm:ss a"),
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
      />
    </>
  );
};

export default EditPaymentHistory;
