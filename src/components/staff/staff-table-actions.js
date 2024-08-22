"use client";

import Link from "next/link";

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
import { toast } from "../../components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetTrigger } from "../../components/ui/sheet";

const StaffTableActions = ({ staff, deletePatient = () => {} }) => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const moveToTrash = async () => {
    try {
      setDisabled(true);
      await deletePatient(staff.id);
      toast({
        title: "Patient moved to trash",
      });
    } catch (error) {
      toast({
        title: error.response ? error.response.data.message : error.message,

        variant: "destructive",
      });
    } finally {
      setDisabled(false);
    }
  };

  const restore = async () => {
    try {
      setDisabled(true);
      toast({
        title: "Staff restored",
      });
      // router.refresh();
    } catch (error) {
      toast({
        title: error.response ? error.response.data.message : error.message,

        variant: "destructive",
      });
    } finally {
      setDisabled(false);
    }
  };

  return staff.isTrashed ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Restore</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure ?</DialogTitle>
        </DialogHeader>
        <DialogDescription>Restore {staff.name} ?</DialogDescription>
        <DialogFooter>
          <Button disabled={disabled} onClick={restore}>
            Restore
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <div className="flex flex-row justify-between max-w-sm w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Link href={`/patients/edit?patientid=${staff.id}`}>
            <Button className="scale-90">Edit</Button>
          </Link>
        </SheetTrigger>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Link
            href={`/patients/edit?patientid=${staff.id}&isopenhistory=true`}
          >
            <Button className="scale-90">Add History</Button>
          </Link>
        </SheetTrigger>
      </Sheet>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="scale-90" variant="destructive">
            Trash
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogDescription>Move {staff.name} to trash</DialogDescription>
          <DialogFooter>
            <Button disabled={disabled} onClick={moveToTrash}>
              Move to trash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffTableActions;
