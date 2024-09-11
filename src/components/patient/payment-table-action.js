"use client";

import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import AddPatientThirdForm from "../staff/add-patient-third-form";
import { DownloadIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import ViewPaymentHistory from "./view-payment-history";

const PaymentTableActions = ({
  patientInfo,
  paymentHistory,
  updatePaymentHistory,
  deletePaymentHistoryHandler,
}) => {
  const generateInvoice = (e) => {
    e.preventDefault();
    // send a post request with the name to our API endpoint for generate PDF
    const fetchData = async () => {
      const { data } = await global.api.sendSync("generateInvoice", {
        ...patientInfo,
        paymentHistory,
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

  function Tooltip({ message, className, children }) {
    return (
      <div class="group relative">
        {children}
        <span
          class={`absolute z-[999] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ${className}`}
        >
          {message}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-between max-w-sm w-full">
      <Dialog>
        <DialogTrigger>
          <Tooltip message={"View Details"}>
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

        <Button
          className="scale-90"
          variant="destructive"
          onClick={() => deleteHandler(paymentHistory.id)}
        >
          Delete
        </Button>
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
