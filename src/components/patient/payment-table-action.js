"use client";

import { Button } from "../../components/ui/button";
import axios from "axios";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import AddPatientThirdForm from "../staff/add-patient-third-form";

const PaymentTableActions = ({ paymentHistory, updatePaymentHistory }) => {
  const generateInvoice = (e) => {
    e.preventDefault();
    // send a post request with the name to our API endpoint for generate PDF
    const fetchData = async () => {
      const { data } = await axios({
        method: "post",
        url: "/api/patients/manage",
        data: { ...patientInfo },
        responseType: "blob",
      });
      // convert the response into an array Buffer
      return data.arrayBuffer();
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

  return (
    <div className="flex flex-row justify-between max-w-sm w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>
        <Button onClick={generateInvoice}>Resept Download</Button>
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
