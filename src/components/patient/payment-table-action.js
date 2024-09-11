"use client";

import { Button } from "../../components/ui/button";
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
import { DownloadIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import ViewPaymentHistory from "./view-payment-history";
import moment from "moment";
import { Tooltip } from "../../lib/utils";

const PaymentTableActions = ({
  patientInfo,
  paymentHistory,
  updatePaymentHistory,
  deletePaymentHistoryHandler,
}) => {
  const isoDate = moment(
    paymentHistory.date,
    "DD-MM-YYYY HH:mm:ss"
  ).toISOString();
  const patientData = {
    ...patientInfo,
    paymentHistory: { ...paymentHistory, date: isoDate },
  };
  const generateInvoice = (e) => {
    e.preventDefault();
    // send a post request with the name to our API endpoint for generate PDF
    const fetchData = async () => {
      const { data } = await global.api.sendSync("generateInvoice", {
        ...patientData,
      });
      // convert the response into an array Buffer
      return data;
    };

    // convert the buffer into an object URL
    const saveAsPDF = async () => {
      const buffer = await fetchData();
      const blob = new Blob([buffer]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "invoice.pdf";
      link.click();
    };

    saveAsPDF();
  };

  const deleteHandler = (id) => {
    deletePaymentHistoryHandler(id);
  };

  return (
    <div className="flex flex-row justify-between max-w-sm w-full">
      <Dialog>
        <DialogTrigger>
          <Tooltip message={"View Details"} className={"top-10 left-0"}>
            <Button className="mr-1">
              <EyeOpenIcon />
            </Button>
          </Tooltip>
        </DialogTrigger>
        <DialogContent className="overflow-y-scroll max-h-screen">
          <DialogHeader>View Payment History</DialogHeader>

          <ViewPaymentHistory staff={paymentHistory} />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="scale-90" variant="destructive">
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure ?</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Delete {paymentHistory.amountCharges} ?
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => deleteHandler(paymentHistory.id)}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button onClick={generateInvoice}>
          Receipt <DownloadIcon />
        </Button>
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
