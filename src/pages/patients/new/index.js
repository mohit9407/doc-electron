"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation'
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Root, Indicator } from "@radix-ui/react-progress";
import ClientOnly from "../../../components/client-only";
import AddStaffForm from "../../../components/staff/add-staff-form";
import AddPatientSecForm from "../../../components/staff/add-patient-sec-form";
import AddPatientThirdForm from "../../../components/staff/add-patient-third-form";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import AppBar from "../../../components/navbar/app-bar";
import StaffTabs from "../../../components/navbar/staff/staff-tabs";

const totalForm = 3;

const Page = () => {
  const pathname = usePathname();
  const [formStep, setFormStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [patientinfo, setpatientinfo] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState(0);

  const getInvoiceNo = async () => {
    const updatedInvoiceInfo = await global.api.sendSync("getInvoiceNo");
    setInvoiceNo(updatedInvoiceInfo?.data?.invoiceNo ?? 0);
  };

  useEffect(() => {
    getInvoiceNo();
  }, []);

  useEffect(() => {
    const progress = 100 / totalForm;
    setProgress(formStep * progress);
  }, [formStep]);

  return (
    <>
      {!pathname.includes("/patients/edit") && (
        <ClientOnly>
          <AppBar isBack backHref="/" title="Manage Patients" />
          <StaffTabs />
        </ClientOnly>
      )}
      <ClientOnly>
        <Root className={"ProgressRoot"} value={progress}>
          <Indicator
            className={"ProgressIndicator"}
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </Root>
        {formStep > 0 && (
          <div className={cn("py-2 text-lg", "text-muted-foreground")}>
            <Button
              variant={"default"}
              size="icon"
              className={cn("mr-2")}
              onClick={() => setFormStep((prevStep) => prevStep - 1)}
            >
              <ArrowLeftIcon />
            </Button>
          </div>
        )}
        {formStep === 0 && (
          <AddStaffForm
            setpatientinfo={setpatientinfo}
            patientinfo={patientinfo}
            setFormStep={setFormStep}
          />
        )}
        {formStep === 1 && (
          <AddPatientSecForm
            setpatientinfo={setpatientinfo}
            patientinfo={patientinfo}
            setFormStep={setFormStep}
          />
        )}
        {formStep === 2 && (
          <AddPatientThirdForm
            setpatientinfo={setpatientinfo}
            patientinfo={patientinfo}
            setFormStep={setFormStep}
            setInvoiceNo={setInvoiceNo}
            invoiceNo={invoiceNo}
          />
        )}
      </ClientOnly>
    </>
  );
};

export default Page;
