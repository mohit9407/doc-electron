"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Root, Indicator } from "@radix-ui/react-progress";
import ClientOnly from "../../../components/client-only";
import AddStaffForm from "../../../components/staff/add-staff-form";
import AddPatientSecForm from "../../../components/staff/add-patient-sec-form";
import AddPatientThirdForm from "../../../components/staff/add-patient-third-form";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";

const totalForm = 3;

const Page = () => {
  const [formStep, setFormStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [patientinfo, setpatientinfo] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState(0);

  const getInvoiceNo = async () => {
    const updatedInvoiceInfo = await global.api.sendSync("getInvoiceNo");
    debugger

    console.log('updatedInvoiceInfo---->>>>', updatedInvoiceInfo);

    setInvoiceNo(await global.api.sendSync("getInvoiceNo")?.data?.invoiceNo ?? 0);
  };

  useEffect(() => {
    getInvoiceNo();
  }, []);

  useEffect(() => {
    const progress = 100 / totalForm;
    setProgress(formStep * progress);
  }, [formStep]);

  return (
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
  );
};

export default Page;
