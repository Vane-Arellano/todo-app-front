"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import { priorities } from "../../data/data"
import { DataTableFacetedFilter } from "./data-table-filters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NewTodoDialog } from "../dialog/new-todo-dialog"
import { doneText, priorityText, statusText, undoneText } from "@/const/todo-constants"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const checkboxOptions = [
    { label: doneText, value: true },
    { label: undoneText, value: false },
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
          {
          table.getColumn("done") && (
            <DataTableFacetedFilter
              column={table.getColumn("done")}
              title={statusText}
              options={checkboxOptions}
            />
          )}
          {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title={priorityText}
              options={priorities} 
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

        <div className="flex space-x-2" data-testid="new-todo-dialog">
          <NewTodoDialog />
        </div>
      </div>
    </div>
  )
}
