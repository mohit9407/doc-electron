"use client";
import React, { useEffect, useState } from "react";
import ErrorContainer from "../../../components/error-container";
import PaymentsTable from "../../../components/staff/payments-table";
import ClientOnly from "../../../components/client-only";
import AppBar from "../../../components/navbar/app-bar";
import { dateFormat } from "../../../lib/utils";

const Page = () => {
  const [allPatientsList, setAllPatientsList] = useState([]);

  const getPaymentsOfPatient = async () => {
    const data = await global.api.sendSync("getAllPayments");
    setAllPatientsList(
      data?.data?.data?.filter((patientObj) => !patientObj.isDeleted).reverse()
    );
  };

  useEffect(() => {
    getPaymentsOfPatient();
  }, []);

  return (
    <>
      <ClientOnly>
        <AppBar isBack backHref="/patients/dashboard" title="Payment Information" />
      </ClientOnly>
      {allPatientsList?.length > 0 ? (
        <ClientOnly>
          <PaymentsTable
            data={allPatientsList?.map((paymentObj) => {
              return {
                ...paymentObj,
                name: paymentObj?.patientInfo?.name,
                mobileNumber: paymentObj?.patientInfo?.mobileNumber,
                date: dateFormat(paymentObj?.patientInfo?.date),
              };
            })}
          />
        </ClientOnly>
      ) : (
        <ClientOnly>
          <ErrorContainer title="No Payment" desc="No payment were found" />
        </ClientOnly>
      )}
    </>
  );
};

export default Page;
