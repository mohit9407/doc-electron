"use client";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { DownloadIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import ViewPaymentHistory from "../patient/view-payment-history";
import moment from "moment";

const PaymentsTableActions = ({ staff }) => {
  const isoDate = moment(staff.date, "DD-MM-YYYY HH:mm:ss").toISOString();
  const patientData = {
    ...staff.patientInfo,
    paymentHistory: { ...staff, date: isoDate },
  };

  const generateInvoice = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      const { data } = await global.api.sendSync("generateInvoice", {
        ...patientData,
      });
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
      <Sheet>
        <SheetTrigger asChild>
          <Link href={""}>
            <div className="flex flex-row justify-between max-w-sm w-full">
              <Dialog>
                <DialogTrigger>
                  <Tooltip message={"View Details"} className="left-[52px]">
                    <Button>
                      <EyeOpenIcon />
                    </Button>
                  </Tooltip>
                </DialogTrigger>
                <DialogContent className="overflow-y-scroll max-h-screen">
                  <DialogHeader>View Payment History</DialogHeader>

                  <ViewPaymentHistory staff={staff} />
                </DialogContent>
              </Dialog>
            </div>
          </Link>
        </SheetTrigger>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Link href={""}>
            <Button className="scale-100 text-[12px]" onClick={generateInvoice}>
              Receipt
              <DownloadIcon />
            </Button>
          </Link>
        </SheetTrigger>
      </Sheet>
    </div>
  );
};

export default PaymentsTableActions;
