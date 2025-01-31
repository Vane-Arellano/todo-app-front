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
import { addTodo, restartTodoValues, RootState, triggerTodoAdded } from "@/redux/store";
import { placeName } from "@/redux/store"
import { createNewTodo } from "../../service/todos"
import { toast } from "sonner"

export function NewTodoDialog() {
  const [name, setName] = useState(''); 
  const [debouncedName, setDebouncedName] = useState(name);
  const [open, setOpen] = useState(false)
  const newTodo = useSelector((state: RootState) => state.todoBody)

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(name);  // Update the debounced name
    }, 500);  // 500ms debounce

    return () => clearTimeout(timer);  // Cleanup the previous timeout
  }, [name]);

  useEffect(() => {
    if (debouncedName) {
      dispatch(placeName(debouncedName));  // Dispatch only after debouncing
    }
  }, [debouncedName, dispatch]);

  const handleSaveTodo = async () => {
    if (newTodo.name != '' && newTodo.priority != ''){
      try {
        const todo = await createNewTodo(newTodo)
        dispatch(addTodo(todo))
        dispatch(triggerTodoAdded())
        setOpen(false)
        dispatch(restartTodoValues());

      }
      catch (error) {
        toast("Something went wrong, please try again" + error)
      }
      
    }
    else {
      toast("Please fill all fields marked with *")
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => {setOpen(!open)}} >
      <DialogTrigger asChild>
        <Button onClick={() => {setOpen(true)}}><Plus/> New To-Do</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New To-Do</DialogTitle>
          <DialogDescription>
            Create a new To-Do task
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name *
            </Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Task 1" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Priority *
            </Label>
            <SelectDemo prevPriority=''/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duedate" className="text-right">
              Due Date
            </Label>
            <DatePickerDemo prevDate={undefined}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveTodo}>Save To-Do</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
