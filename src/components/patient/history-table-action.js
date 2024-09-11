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
import AddPatientSecForm from "../staff/add-patient-sec-form";
import { toast } from "../../components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetTrigger } from "../ui/sheet";
import ViewPatientHistory from "./view-patient-hisrory";

const HistoryTableActions = ({
  patientHistory,
  deleteHistoryHandler,
  updatePatientHistory,
}) => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const moveToTrash = async () => {
    try {
      setDisabled(true);
      deleteHistoryHandler(patientHistory.id);
      toast({
        title: "Patient history moved to trash",
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

  const restore = async () => {};

  function Tooltip({ message, className, children }) {
    return (
      <div class="group relative">
        {children}
        <span
          class={`absolute z-[999] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap ${className}`}
        >
          {message}
        </span>
      </div>
    );
  }

  return patientHistory.isDeleted ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Restore</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure ?</DialogTitle>
        </DialogHeader>
        <DialogDescription>Restore {patientHistory.name} ?</DialogDescription>
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
          <div className="flex flex-row justify-between max-w-sm">
            <Dialog>
              <DialogTrigger>
                <Tooltip
                  message={"View Details"}
                  className={"top-10 left-0"}
                >
                  <Button>View</Button>
                </Tooltip>
              </DialogTrigger>
              <DialogContent className="overflow-y-scroll max-h-screen">
                <DialogHeader>View Patient History</DialogHeader>

                <ViewPatientHistory staff={patientHistory} />
              </DialogContent>
            </Dialog>
          </div>
        </SheetTrigger>
      </Sheet>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-scroll max-h-screen">
          <DialogHeader>Edit Patient History</DialogHeader>
          <AddPatientSecForm
            patientinfo={{ ...patientHistory }}
            updatePatientHistory={updatePatientHistory}
          />
        </DialogContent>
      </Dialog>
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
          <DialogDescription>
            Move {patientHistory.chiefComplaints} to trash
          </DialogDescription>
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

export default HistoryTableActions;
