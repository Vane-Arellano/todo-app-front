import * as React from "react"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTableToolbar } from "./toolbar/data-table-toolbar"
import TableColumns from "../data/columns"
import { AlertDelete } from "./dialog/confirm-delete"
import   PaginationControlsDataTable from "./pagination/pagination"
import { useState } from "react"
import { Todo } from "../interfaces/todos"


const calculateDueDateClass = (dueDate: string | null) => {
  if (!dueDate) return ""; // No due date, no background color

  const today = new Date();
  const due = new Date(dueDate);
  const diffInTime = due.getTime() - today.getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert from milliseconds to days

  if (diffInDays < 0) {
    // Due date is in the past
    return "bg-[#D67172] hover:none"; // Red background
  } else if (diffInDays <= 7) {
    // Due date is within 1 week
    return "bg-[#D67172] hover:none"; // Red background
  } else if (diffInDays <= 14) {
    // Due date is within 2 weeks
    return "bg-[#FFECA1] hover:none"; // Yellow background
  } else {
    // More than 2 weeks
    return "bg-[#91AC87] hover:none"; // Green background
  }
};


export const TasksTable = ({ data, totalPages, page, totalTodos }:
  { data: Todo[], totalPages: number, page: number, totalTodos: number }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    done: false,
    id: false,
    doneDate: false,
    creationDate: false,
  })
  const [rowSelection, setRowSelection] = useState({})

  // const [page, setPage] = useState({ pageIndex: 0, pageSize: 10 })
  const columns = TableColumns()

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="grid w-full gap-8">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const dueDate: string = row.getValue("dueDate");
                const rowBgClass = calculateDueDateClass(dueDate);

                return (
                  <TableRow
                    key={row.id}
                    data-state={
                      row.getIsSelected() ||
                      (row.getValue("done") === "true" && "selected")
                    }
                    className={`${
                      row.getIsSelected() || row.getValue("done") === "true"
                        ? "line-through opacity-50"
                        : ""
                    } ${rowBgClass}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between space-x-2 py-4">
        {/* Page Range Display */}
        <div className="flex-1 text-sm text-muted-foreground w-auto">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {totalTodos} to-do(s) done.
        </div>
        <div className="w-fit">
          <PaginationControlsDataTable 
            totalPages={totalPages}
            page={page}
          /> 
        </div>
      </div>

      <AlertDelete />
    </div>
  );
};
