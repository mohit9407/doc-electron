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

  const restore = async () => {};

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
