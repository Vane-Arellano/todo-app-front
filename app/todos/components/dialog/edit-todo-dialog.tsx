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
import { editTodo, placeName, RootState } from "@/redux/store"
import { closeEdit } from "@/redux/store" 
import { useEffect, useState } from "react"
import { updateTodo } from "../../service/todos"
import { toast } from "sonner"

export function EditTaskDemo() {
  const edit = useSelector((state: RootState) => state.edit);
  const todos = useSelector((state: RootState) => state.todos.todos);
  const editTodoSelector = useSelector((state: RootState) => state.todoBody)
  const [name, setName] = useState(''); 
  const [priority, setPriority] = useState<"low" | "medium" | "high">();
  const [dueDate, setDueDate] = useState<Date>();
  const dispatch = useDispatch();

  let todoToEdit: any  = todos.find(todo => todo.id === edit.id);

  useEffect(() => {
    if (todoToEdit) {
      setName(todoToEdit.name)
      setPriority(todoToEdit.priority == '0' ? 'low' : todoToEdit.priority == '1' ? 'medium' : 'high')
      setDueDate(new Date(todoToEdit.dueDate ?? ''))
    }
  }, [todoToEdit])


  const handleEditTodo = async () => {
    if(todoToEdit && name != '' && editTodoSelector.priority != ''){
      dispatch(placeName(name))
      await updateTodo(edit.id!, { 
        name: name, 
        priority: editTodoSelector.priority, 
        dueDate: editTodoSelector.dueDate});
      dispatch(closeEdit());

      dispatch(editTodo({
        id: edit.id, 
        name: name, 
        priority: editTodoSelector.priority, 
        dueDate: editTodoSelector.dueDate
      }));
    }
    else {
      toast('Something went wrong, please fill all fields marked with *')
    }
  }

  const handleCloseEdit = () => {
    dispatch(closeEdit());
  }

  // for this component we must obtain the todo id so we can populate the dialog with the info of that todo 
  // once the user clicks on save to-do handle the save by updating the todo on the redux store
  // once updated, pass the info to the endpoint
  return (
    <>{
      edit && (
        <Dialog open={edit.edit} onOpenChange={handleCloseEdit}>
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
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="col-span-3"/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Priority
                </Label>
                <SelectDemo prevPriority={priority!}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duedate" className="text-right">
                  Due Date
                </Label>
                <DatePickerDemo prevDate={dueDate}/>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleEditTodo}>Edit To-Do</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    }
    </>
  )
}
