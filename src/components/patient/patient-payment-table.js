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
  const [selectedRecord, setSelectedRecord] = useState([]);

  const updatePaymentHistoryHandler = (id, historyData) => {
    updatePaymentHistory(id, historyData);
    setIsOpen(false);
  };

  const receiptHandler = async () => {
    if (selectedRecord.length > 0) {
      const paymentHistory = selectedRecord.map((id) => {
        const paymentRecord = data?.find((obj) => obj.id === id);
        return {
          ...paymentRecord,
          date: paymentRecord.date,
        };
      });

      const dataForReportGen = {
        ...patientInfo,
        paymentHistory,
      };

      const { data: apiData } = await global.api.sendSync(
        "generateInvoice",
        dataForReportGen
      );

      // convert the buffer into an object URL
      const saveAsPDF = () => {
        const blob = new Blob([apiData]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "invoice.pdf";
        link.click();
      };

      saveAsPDF();
      setSelectedRecord([]);
    }
  };

  const columns = [
    {
      id: "selectRow",
      header: "",
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="form-check-input w-4 h-4 border border-gray-400 rounded bg-white p-1"
          name="allSelect"
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRecord([...selectedRecord, row.original.id]);
            } else {
              let localSelectedRecords = [...selectedRecord];
              localSelectedRecords.splice(
                localSelectedRecords.indexOf(row.original.id),
                1
              );
              setSelectedRecord([...localSelectedRecords]);
            }
          }}
          checked={selectedRecord.includes(row.original.id)}
        />
      ),
    },
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
        <div className="flex row gap-2 py-4 mb-2">
          <select
            value={table.getColumn("payment")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("payment")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-[transparent] border border-solid border-[#ebe3e3] rounded-[8px]"
          >
            <option value="">Filter Payments...</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <Button onClick={resetFilter}>Reset</Button>
        </div>
        <div className="ml-auto mb-2">
          <Button
            disabled={selectedRecord.length === 0}
            className="mr-1"
            onClick={receiptHandler}
          >
            Generate Receipt
          </Button>
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
              <Button onClick={() => setIsOpen(true)} className="ml-1">
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
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={`${
                        header.id === "payment" || header.id === "treatment"
                          ? "w-[20px]"
                          : "w-10"
                      }`}
                      key={header.id}
                    >
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
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        className={
                          cell.column.id === "payment" ||
                          cell.column.id === "treatment"
                            ? "max-w-[20px]"
                            : "max-w-[134px]"
                        }
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
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
