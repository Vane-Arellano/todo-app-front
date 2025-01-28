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

import { Button } from "@/components/ui/button"
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
import { Todo } from "@/redux/store"

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


export const TasksTable = ({ data }: { data: Todo[] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    done: false,
    id: false,
    doneDate: false,
    creationDate: false,
  })
  const [rowSelection, setRowSelection] = React.useState({})
  const [page, setPage] = React.useState({ pageIndex: 0, pageSize: 10 })
  const columns = TableColumns()
  console.log(data)

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
    onPaginationChange: setPage,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: page,
    },
  })

  // Calculate the total number of pages
  const totalPages = Math.ceil(table.getFilteredRowModel().rows.length / page.pageSize)

  // Handle the page jump event
  const handlePageJump = (pageIndex: number) => {
    setPage({ ...page, pageIndex })
    table.setPageIndex(pageIndex) // Update the table pagination
  }

  // Generate a range of page numbers to display
  const generatePageRange = () => {
    const range = [];
    let start = Math.max(0, page.pageIndex - 4); // Start 4 pages back
    let end = Math.min(totalPages - 1, page.pageIndex + 5); // End 5 pages ahead
    
    // Adjust range if close to start or end of pagination
    if (page.pageIndex <= 4) {
      end = Math.min(9, totalPages - 1);
    } else if (page.pageIndex >= totalPages - 5) {
      start = Math.max(totalPages - 10, 0);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

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
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} to-do(s) done.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageJump(0)}
            disabled={page.pageIndex === 0}
          >
            {"<<"}
          </Button>
          {generatePageRange().map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={page.pageIndex === pageNumber ? "secondary" : "outline"}
              size="sm"
              onClick={() => handlePageJump(pageNumber)}
            >
              {pageNumber + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageJump(totalPages - 1)}
            disabled={page.pageIndex === totalPages - 1}
          >
            {">>"}
          </Button>
        </div>
      </div>

      <AlertDelete />
    </div>
  );
};
