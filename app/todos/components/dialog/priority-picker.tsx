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
import { metricsHigh, metricsLow, metricsMedium, priorityText } from "@/const/todo-constants";

export function SelectDemo({prevPriority}: {prevPriority: string}) {
  const [priority, setPriority] = useState(prevPriority)
  const dispatch = useDispatch();

  useEffect(() => {
    if (priority != ''){
      dispatch(placePriority(priority))
    }
  }, [priority, dispatch])

  const handlePriorityChange = (value: string) => {
    setPriority(value)
  }

  return (
    <Select value={priority} onValueChange={handlePriorityChange} name="priority">
      <SelectTrigger className="col-span-3" data-testid="priority">
        <SelectValue placeholder="Select priority"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{priorityText}</SelectLabel>
          <SelectItem data-testid="low" value="low">{metricsLow}</SelectItem>
          <SelectItem value="medium">{metricsMedium}</SelectItem>
          <SelectItem value="high">{metricsHigh}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
