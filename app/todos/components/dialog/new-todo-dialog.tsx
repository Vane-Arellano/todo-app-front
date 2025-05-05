import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DatePickerDemo } from "./date-picker"
import { SelectDemo } from "./priority-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
import { placeName } from "@/redux/store"
import { handleSaveTodo } from "../../handlers/newTodoDialogHandlers"
import { dueDateText, nameText, newTodoDescription, newTodoText, priorityText, saveTodoText } from "@/const/todo-constants"

export function NewTodoDialog() {
  const [name, setName] = useState(''); 
  const [debouncedName, setDebouncedName] = useState(name);
  const [open, setOpen] = useState(false)
  const newTodo = useSelector((state: RootState) => state.todoBody)

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(name);  
    }, 500);  

    return () => clearTimeout(timer);  
  }, [name]);

  useEffect(() => {
    if (debouncedName) {
      dispatch(placeName(debouncedName));  
    }
  }, [debouncedName, dispatch]);

  return (
    <Dialog open={open} onOpenChange={() => {setOpen(!open)}}>
      <DialogTrigger asChild>
        <Button onClick={() => {setOpen(true)}}><Plus/> New To-Do</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{newTodoText}</DialogTitle>
          <DialogDescription>
            {newTodoDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {nameText} *
            </Label>
            <Input 
              id="name" 
              data-testid="name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Task 1" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              {priorityText} *
            </Label>
            <SelectDemo prevPriority=''/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duedate" className="text-right">
              {dueDateText} 
            </Label>
            <DatePickerDemo prevDate={undefined}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={ () => 
            handleSaveTodo(newTodo, dispatch, setOpen)
          }>{saveTodoText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
