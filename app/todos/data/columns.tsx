import { ColumnDef, Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { openEdit, openDelete, changeStatus, RootState } from "@/redux/store";
import { changeTodoStatus } from "../service/todos";
import { toast } from "sonner";
import { priorities } from "./data";
import { deleteText, dueDateText, editText, nameText, priorityText } from "@/const/todo-constants";
import { handleMultipleStatusChange, handleOpenDelete, handleOpenEdit, handleStatusChange } from "../handlers/columnsHandlers";

export type Task = {
  id: string;
  name: string;
  priority: string;
  dueDate: string | null;
  done: string; 
  doneDate: string | null;
  creationDate: string;
};

const TableColumns = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "id",
      header: "id",
    },
    {
      accessorKey: "creationDate",
      header: "creation date",
    },
    {
      accessorKey: "doneDate",
      header: "done date",
    },
    {
      accessorKey: "done",
      header: "done",
    },
    {
      id: "select",
      accessorKey: "select",
      header: ({ table }) => {
        return(
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              handleMultipleStatusChange(value, table, dispatch);
            }}
            aria-label="Select all"
          />
        )
        },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected() || row.getValue("done") === 'true'}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            handleStatusChange(row.getValue("id"), dispatch);
          }}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "name",
      header: nameText,
    },
    {
      accessorKey: "priority",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {priorityText}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">
          {row.getValue("priority") === priorities[0].value
            ? "low"
            : row.getValue("priority") === priorities[1].value
            ? "medium"
            : "high"}
        </div>
      ),
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {dueDateText}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const dueDate = new Date(row.getValue("dueDate"));
        return <div>{row.getValue("dueDate")? dueDate.toLocaleDateString() : ''}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          row.getValue("done") === "false" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-primary"
                  onClick={() => handleOpenEdit(row.getValue("id"), todos, dispatch)}
                >
                  <Edit />
                  {editText}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => handleOpenDelete(row.getValue("id"), dispatch)}
                >
                  <Trash />
                  {deleteText}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        );
      },
    },
  ];

  return columns;
};

export default TableColumns;
