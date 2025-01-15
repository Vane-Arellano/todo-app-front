import { Task, columns } from "./columns"
import  { DataTable } from "./TasksTable"

async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  return [
    {
      id: '12324',
      name: "Task 1",
      priority: "low",
      due_date: new Date(),
    },
    {
      id: '12325',
      name: "Task 2",
      priority: "high",
      due_date: new Date(),
    },
    // ...
  ]
}

export default async function TaskPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable data={data} columns={columns} />
    </div>
  )
}
