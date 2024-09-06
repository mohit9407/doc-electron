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

const PaymentsTableActions = ({ staff }) => {
  function Tooltip({ message, className, children }) {
    return (
      <div class="group relative">
        {children}
        <span class={`absolute z-[999] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ${className}`} >
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
            <Tooltip message={"Download Receipt"} className="right-[32px] bottom-[10px]">
              <Button className="scale-100 text-[12px]">
                Receipt
                <DownloadIcon />
              </Button>
            </Tooltip>
          </Link>
        </SheetTrigger>
      </Sheet>
    </div>
  );
};

export default PaymentsTableActions;
