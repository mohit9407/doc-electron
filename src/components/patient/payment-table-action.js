"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import AddPatientThirdForm from "../staff/add-patient-third-form";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PaymentTableActions = ({
  paymentHistory,
  deletePaymentHandler,
  updatePaymentHistory,
}) => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const moveToTrash = async () => {
    try {
      setDisabled(true);
      deletePaymentHandler(paymentHistory.id);
      toast({
        title: "Payment history moved to trash",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: error.response ? error.response.data.message : error.message,

        variant: "destructive",
      });
    } finally {
      setDisabled(false);
    }
  };

  const restore = async () => {};

  return paymentHistory.isDeleted ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Restore</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure ?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Restore {paymentHistory?.amountCharges} ?
        </DialogDescription>
        <DialogFooter>
          <Button disabled={disabled} onClick={restore}>
            Restore
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
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
