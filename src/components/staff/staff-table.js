"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import StaffTableActions from "./staff-table-actions";
import { dateFormat } from "../../lib/utils";

const StaffTable = ({ data, deletePatient }) => {
  const [columnFilters, setColumnFilters] = useState([]);

  const pathName = usePathname();
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => (
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-full inline-block">
          {getValue()}
        </span>
      ),
    },
    {
      accessorKey: "mobileNumber",
      header: "Mobile Number",
    },
    {
      accessorKey: "lastVisitedDate",
      header: "Last Visited Date",
    },
  ];

  if (!pathName.includes("/trash"))
    columns.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const staff = row.original;

        return (
          <StaffTableActions staff={staff} deletePatient={deletePatient} />
        );
      },
    });

  const table = useReactTable({
    data: data,
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
    <div>
      <div className="flex row justify-between py-4">
        <Input
          placeholder="Filter Names..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mx-2"
        />
        <Input
          placeholder="Filter Mobile Numbers..."
          value={table.getColumn("mobileNumber")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("mobileNumber")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mx-2"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups()?.map((headerGroup) => (
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
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row) => (
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

          <select
            className="text-xs rounded-md h-8 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 30, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default StaffTable;
