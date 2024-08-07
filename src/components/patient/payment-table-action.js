"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import AddPatientThirdForm from "../staff/add-patient-third-form";

const PaymentTableActions = ({ paymentHistory, updatePaymentHistory }) => {
  return (
    <div className="flex flex-row justify-between max-w-sm w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-scroll max-h-screen">
          <DialogHeader>Edit Payment History</DialogHeader>
          <AddPatientThirdForm
            patientinfo={{ ...paymentHistory }}
            updatePaymentHistory={updatePaymentHistory}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentTableActions;
