import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { TasksTable } from '../app/task/components/todo-table'
import { Button } from '@/components/ui/button' // Ensure Button is imported correctly
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const mockColumns = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
      },
      {
        accessorKey: "name", 
        header: "Name"
      },
      {
        accessorKey: "priority", 
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Priority
              <ArrowUpDown />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("priority")}</div>,
      }, 
      {
        accessorKey: "due",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Due Date
              <ArrowUpDown />
            </Button>
          )
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const payment = row.original
     
          return (
            <DropdownMenu>
          <DropdownMenuTrigger asChild >
            <Button variant="ghost">
              <MoreHorizontal/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-primary">
              <Edit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          )
        }
      },
]

const mockData = [
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
]

describe('DataTable Component', () => {
  test('renders table headers and data rows', () => {
    render(<TasksTable data={mockData} columns={mockColumns} />)

    // Check if table headers are rendered
    expect(screen.getByText(/Name/i)).toBeInTheDocument()
    expect(screen.getByText(/Priority/i)).toBeInTheDocument()
    expect(screen.getByText(/Due Date/i)).toBeInTheDocument()

    // Check if data rows are rendered
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument()
  })

  test('filters table data based on input', () => {
    render(<TasksTable data={mockData} columns={mockColumns} />)

    // Get filter input and simulate typing
    const filterInput = screen.getByPlaceholderText('Filter tasks...')
    fireEvent.change(filterInput, { target: { value: '1' } })

    // Check that only 'John Doe' is shown
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument()
    expect(screen.queryByText(/Task 2/i)).toBeNull()
  })

  test('renders pagination buttons', () => {
    render(<TasksTable data={mockData} columns={mockColumns} />)

    // Check if the pagination buttons are rendered
    expect(screen.getByText(/Previous/i)).toBeInTheDocument()
    expect(screen.getByText(/Next/i)).toBeInTheDocument()
  })

  test('clicking the "New To-Do" button', () => {
    render(<TasksTable data={mockData} columns={mockColumns} />)

    // Find the "New To-Do" button and click it
    const newTodoButton = screen.getByRole('button', { name: /New To-Do/i })
    fireEvent.click(newTodoButton)

    // Test if the click event triggers expected behavior
    // In this case, we're testing that the button is rendered correctly, so no changes
    // to the UI, but if there were other interactions (e.g., opening a modal), we'd check them here
    expect(newTodoButton).toBeInTheDocument()
  })

//   test('click on actions button', () => {
//     render(<TasksTable data={mockData} columns={mockColumns} />)
//     // Find the "MoreHorizontal" icon button (used as the dropdown trigger)
//     const moreButton = screen.getAllByRole('button')[0]; // Get the first row's button (with icon)
//     fireEvent.click(moreButton);

//     // Check if the dropdown menu is visible
//     const dropdownMenu = screen.getByRole('menu');
//     expect(dropdownMenu).toBeInTheDocument();
//   })
})
