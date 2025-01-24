import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { placePriority } from "@/redux/store";

export function SelectDemo({prevPriority}: {prevPriority: string}) {
  const [priority, setPriority] = useState(prevPriority)
  const dispatch = useDispatch();

  useEffect(() => {
    if (priority != ''){
      dispatch(placePriority(priority))
    }
  }, [priority])

  const handlePriorityChange = (value: string) => {
    setPriority(value)
  }

  return (
    <Select value={priority} onValueChange={handlePriorityChange}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Select priority"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Priority</SelectLabel>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
