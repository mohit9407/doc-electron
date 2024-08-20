"use client";

import { useState } from "react";
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

const PaymentTable = ({ data, updatePaymentHistory }) => {
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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const paymentHistory = row.original;
        return (
          <PaymentTableActions
            paymentHistory={paymentHistory}
            updatePaymentHistory={updatePaymentHistory}
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

  return (
    <div className="flex flex-col">
      <Dialog
        open={isOpen}
        onOpenChange={(isModalOpen) =>
          !isModalOpen && isOpen && setIsOpen(false)
        }
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
