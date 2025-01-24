"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import { openEdit, openDelete, changeStatus, RootState } from "@/redux/store"
import { changeTodoStatus } from "../service/todos"
import { toast } from "sonner"

export type Task = {
  id: string;
  name: string;
  priority: string;
  dueDate: string | null;
  done: boolean; 
  doneDate: string | null; 
  creationDate: string;
}

const TableColumns = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos)

  const handleOpenEdit = (id: String) => {
    const todoToEdit = todos.find(todo => todo.id === id);

    if (todoToEdit){
      dispatch(openEdit(id))
    }
    else {
      toast('Something went wrong, try again')
    }
  }

  const handleOpenDelete = () => {
    dispatch(openDelete())
  }

  const handleStatusChange = (id : String) => {
    changeTodoStatus(id) // call to the API to change the status
    dispatch(changeStatus({id})) // call to store reducer to change status without having to reload page
  }

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "id", 
      header: "id"
    },
    {
      accessorKey: "creationDate", 
      header: "creation date"
    }, 
    {
      accessorKey: "doneDate",
      header: "done date"

    },
    {
      accessorKey: 'done', 
      header: 'done',

    },
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected() || row.getValue('done') === 'true'}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value)
            handleStatusChange(row.getValue('id'))
          }}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "name", 
      header: "Name"
    },
    {
      accessorKey: "priority", 
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Priority
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => 
        <div className="lowercase">
          {row.getValue("priority") == '0' ? 'low' : row.getValue("priority") == '1' ? "medium" : "high"}
        </div>,
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Due Date
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const dueDate = new Date(row.getValue("dueDate"));
        return <div>{dueDate.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-primary" onClick={() => {handleOpenEdit(row.getValue('id'))}}>
                <Edit />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={handleOpenDelete}>
                <Trash />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};

export default TableColumns;