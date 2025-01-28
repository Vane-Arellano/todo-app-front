"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import { priorities } from "../../data/data"
import { DataTableFacetedFilter } from "./data-table-filters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogDemo } from "../dialog/new-todo-dialog"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  // Define the checkbox filter options
  const checkboxOptions = [
    { label: "Done", value: true },
    { label: "Undone", value: false },
  ]

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-row w-2/3 space-x-2">
          <Input
            placeholder="Filter to-do's..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-[150px] lg:w-1/2"
          />
          {/* Checkbox Selection Filter */}
          {
          table.getColumn("done") && (
            <DataTableFacetedFilter
              column={table.getColumn("done")}
              title="Status"
              options={checkboxOptions} // Use the checkbox options (Checked, Unchecked)
            />
          )}

          {/* Priority Filter */}
          {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Priority"
              options={priorities} // Priorities should be predefined options
            />
          )}

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="px-2 lg:px-3"
            >
              Reset
              <X />
            </Button>
          )}
        </div>

        <div className="flex space-x-2">
          <DialogDemo />
        </div>
      </div>
    </div>
  )
}
