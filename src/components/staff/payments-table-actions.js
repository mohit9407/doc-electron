"use client";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import ViewPaymentHistory from "../patient/view-payment-history";

const PaymentsTableActions = ({ staff }) => {

  return (
    <div className="flex flex-row justify-between max-w-sm w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Link href={""}>
            <div className="flex flex-row justify-between max-w-sm w-full">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <EyeOpenIcon />
                  </Button>
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
            <Button className="scale-90 text-[10px]">Receipt Download</Button>
          </Link>
        </SheetTrigger>
      </Sheet>
    </div>
  );
};

export default PaymentsTableActions;
