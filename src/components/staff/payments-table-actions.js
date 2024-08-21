"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

const PaymentsTableActions = ({ staff }) => {

  return (
    <div className="flex flex-row justify-between max-w-sm w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Link href={""}>
            <Button className="scale-90">V</Button>
          </Link>
        </SheetTrigger>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Link href={""}>
            <Button className="scale-90">E</Button>
          </Link>
        </SheetTrigger>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Link href={""}>
            <Button className="scale-90">PDF</Button>
          </Link>
        </SheetTrigger>
      </Sheet>
    </div>
  );
};

export default PaymentsTableActions;
