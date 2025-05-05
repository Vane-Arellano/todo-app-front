import { changeStatus, openDelete, openEdit } from "@/redux/store";
import { Todo } from "../interfaces/todos";
import { toast } from "sonner";
import { changeTodoStatus } from "../service/todos";

export const handleOpenEdit = (id: string, todos: Todo[], dispatch: any) => {
    const todoToEdit = todos.find((todo) => todo.id === id);

    if (todoToEdit) {
        dispatch(openEdit(id));
    } else {
        toast('Something went wrong, try again');
    }
}

export const handleOpenDelete = (id: string, dispatch: any) => {
    dispatch(openDelete(id));
}

export const handleStatusChange = async (id: string, dispatch: any) => {
    try {
        await changeTodoStatus(id);
        dispatch(changeStatus({ id }));
        
    } catch (error) {
        toast.error("Failed to update status, try again." + error);
    }
}

export const handleMultipleStatusChange = async (value: string | boolean, table: any, dispatch: any) => {
    if (!!value === true) {
        table.toggleAllPageRowsSelected(!!value)
        // Set timeout to execute this code just after toggle rows selection values
        setTimeout(() => {
            const selectedRows = table.getFilteredSelectedRowModel().rows
            const selectedIds: string[] = selectedRows.map((row: any) => row.getValue("id"));
            selectedIds.forEach((id: string) => handleStatusChange(id, dispatch))
        }, 0)
    } else {
        const selectedRows = table.getFilteredSelectedRowModel().rows
        const selectedIds: string[] = selectedRows.map((row: any) => row.getValue("id"));
        selectedIds.forEach((id: string) => handleStatusChange(id, dispatch))
        // Set timeout toggle rows selection values after sending the ids to change it 
        setTimeout(() => {
            table.toggleAllPageRowsSelected(!!value)
        }, 0)
    }
}