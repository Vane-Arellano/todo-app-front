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
import { RootState } from "@/redux/store"
import { closeEdit } from "@/redux/store" 

export function EditTaskDemo() {
  const edit = useSelector((state: RootState) => state.edit);
  const dispatch = useDispatch();
  const handleCloseEdit = () => {
    dispatch(closeEdit());
  }
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
                <Input id="name" placeholder="Task 1" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Priority
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
    </>
  )
}
