"use client";

import { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";

import { Button } from "../../components/ui/button";
import PaymentTableActions from "./payment-table-action";
import AddPatientThirdForm from "../staff/add-patient-third-form";
import { dateFormat } from "../../lib/utils";
import { Input } from "../ui/input";

const PaymentTable = ({
  patientInfo,
  isOpenAddpayment,
  setIsOpenAddpayment = () => {},
  data,
  updatePaymentHistory,
  deletePaymentHistoryHandler,
}) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const updatePaymentHistoryHandler = (id, historyData) => {
    updatePaymentHistory(id, historyData);
    setIsOpen(false);
  };

  const columns = [
    {
      accessorKey: "amountCharges",
      header: "Amount Charges",
    },
    {
      accessorKey: "displayDate",
      header: "Date & Time",
    },
    {
      accessorKey: "treatment",
      header: "Treatment",
      cell: ({ getValue }) => (
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-full inline-block">
          {getValue()}
        </span>
      ),
    },
    {
      accessorKey: "payment",
      header: "Payment",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const paymentHistory = row.original;
        return (
          <PaymentTableActions
            patientInfo={patientInfo}
            paymentHistory={{
              ...paymentHistory,
              name: patientInfo.name,
              mobileNumber: patientInfo.mobileNumber,
              date: paymentHistory.date,
              patientInfo: { age: patientInfo.age },
            }}
            updatePaymentHistory={updatePaymentHistory}
            deletePaymentHistoryHandler={deletePaymentHistoryHandler}
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  useEffect(() => {
    if (isOpenAddpayment && !isOpen) setIsOpen(true);
  }, [isOpenAddpayment]);

  const resetFilter = () => {
    table.getColumn("payment")?.setFilterValue("");
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="flex row gap-[60px] py-4">
          <select
            value={table.getColumn("payment")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("payment")?.setFilterValue(event.target.value)
            }
            className="max-w-sm mx-2 bg-[transparent] border border-solid border-[#ebe3e3] rounded-[8px]"
          >
            <option value="">Filter Payments...</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <Button onClick={resetFilter}>Reset</Button>
        </div>
        <Dialog
          open={isOpen}
          onOpenChange={(isModalOpen) => {
            if (!isModalOpen) {
              isOpen && setIsOpen(false);
              isOpenAddpayment && setIsOpenAddpayment(false);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)} className="ml-auto mb-2">
              Add Payment History
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-y-scroll max-h-screen">
            <DialogHeader>Add Payment History</DialogHeader>
            <AddPatientThirdForm
              isNewPayment={true}
              patientinfo={null}
              updatePaymentHistory={updatePaymentHistoryHandler}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 px-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
