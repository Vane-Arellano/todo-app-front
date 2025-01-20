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

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Plus/> New To-Do</Button>
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
            <Input id="name" placeholder="Task 1" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Priority *
            </Label>
            <SelectDemo/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duedate" className="text-right">
              Due Date
            </Label>
            <DatePickerDemo/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save To-Do</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
