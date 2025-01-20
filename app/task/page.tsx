import { Task } from "./data/columns"
import  { TasksTable } from "./components/todo-table"
import TableColumns from "./data/columns";

async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  return [
    {
      id: '12324',
      name: "Task 1",
      priority: "low",
      due: currentDate,
      status: 'undone'
    },
    {
      id: '12325',
      name: "Task 2",
      priority: "high",
      due:currentDate,
      status: 'done'

    },
    {
      id: '12324',
      name: "Task 1",
      priority: "low",
      due: currentDate,
      status: 'undone'

    },
    {
      id: '12325',
      name: "Task 2",
      priority: "high",
      due:currentDate,
      status: 'done'

    },
    {
      id: '12324',
      name: "Task 1",
      priority: "low",
      due: currentDate,
      status: 'undone'

    },
    {
      id: '12325',
      name: "Task 2",
      priority: "high",
      due:currentDate,
      status: 'done'

    },
    {
      id: '12324',
      name: "Task 1",
      priority: "low",
      due: currentDate,
      status: 'undone'

    },
    {
      id: '12325',
      name: "Task 2",
      priority: "high",
      due:currentDate,
      status: 'done'

    },
    {
      id: '12324',
      name: "Task 1",
      priority: "low",
      due: currentDate,
      status: 'undone'

    },
    {
      id: '12325',
      name: "Task 2",
      priority: "high",
      due:currentDate,
      status: 'done'

    },
    {
      id: '12324',
      name: "Task 1",
      priority: "low",
      due: currentDate,
      status: 'undone'

    },
    {
      id: '12325',
      name: "Task 2",
      priority: "high",
      due:currentDate,
      status: 'done'

    },
    {
      id: '12324',
      name: "Task 1",
      priority: "low",
      due: currentDate,
      status: 'undone'

    },
    {
      id: '12325',
      name: "Task 2",
      priority: "high",
      due:currentDate,
      status: 'done'

    },
    {
      id: '12324',
      name: "Task 1",
      priority: "low",
      due: currentDate,
      status: 'undone'

    },
    {
      id: '12325',
      name: "Task 2",
      priority: "high",
      due:currentDate,
      status: 'done'

    },
    // ...
  ]
}

export default async function TaskPage() {
  const data = await getData()
  return (
    <div className="container mx-auto py-10">
      <TasksTable data={data} />
    </div>
  )
}
