"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DatePickerDemo } from "./date-picker"
import { SelectDemo } from "./priority-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSelector, useDispatch } from "react-redux"
import {  RootState } from "@/redux/store"
import { closeEdit } from "@/redux/store" 
import { useEffect, useState } from "react"
import { Todo } from "../../interfaces/todos"
import { handleCloseEdit, handleEditTodo, handlePlaceTodoToEdit } from "../../handlers/editTodoDialogHandlers"

export function EditTaskDialog() {
  const edit = useSelector((state: RootState) => state.edit);
  const todos = useSelector((state: RootState) => state.todos.todos);
  const editTodoSelector = useSelector((state: RootState) => state.todoBody)
  const [name, setName] = useState(''); 
  const [priority, setPriority] = useState<"low" | "medium" | "high">();
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const dispatch = useDispatch();


  const todoToEdit: Todo | undefined  = todos.find(todo => todo.id === edit.id);

  useEffect(() => {
    handlePlaceTodoToEdit(
      todoToEdit,
      setName,
      setPriority,
      setDueDate
    )
  }, [todoToEdit])

  return (
    <>{
      edit && (
        <Dialog open={edit.edit} onOpenChange={() => handleCloseEdit(dispatch, closeEdit)} data-testid="edit-dialog">
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit To-Do</DialogTitle>
              <DialogDescription>
                Edit To-Do task
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input 
                  id="name" 
                  data-testid="name"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Priority
                </Label>
                <SelectDemo prevPriority={priority!}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duedate" className="text-right">
                  Due Date
                </Label>
                <DatePickerDemo prevDate={dueDate ?? undefined}/>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" name="edit-to-do" onClick={
                () => handleEditTodo(
                  todoToEdit,
                  name, 
                  editTodoSelector,
                  dispatch, 
                  edit,
                  closeEdit
                )
                }>
                  Edit To-Do
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    }
    </>
  )
}
