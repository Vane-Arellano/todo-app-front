import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { TasksTable } from '../app/todos/components/todo-table'
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
import { Provider } from 'react-redux'
import TableColumns from '../app/todos/data/columns'

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
const mockColumns = TableColumns();
const mockStore = configureStore();

const store = mockStore({
  todos: {
    todos: [], // Mock any state you need here
    isTodoAdded: false,
  },
  // add other slice states if needed
});


describe('DataTable Component', () => {
  test('renders table headers and data rows', () => {
    render(
      <Provider store={store}>
        <TasksTable data={mockData} columns={mockColumns} />
      </Provider>
  )

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
