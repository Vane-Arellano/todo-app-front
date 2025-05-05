// __tests__/components/dialog/edit-task-dialog.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Store, { closeEdit, createTSlice, deleteSlice, editSlice, editTodo, metricsSlice, openEdit, paginationSlice, todoBodySlice, todosSlice } from '@/redux/store'; // your store without redux-thunk
import { setTodos } from '@/redux/store';
import userEvent from '@testing-library/user-event';
import { Todo } from '@/app/todos/interfaces/todos';
import { EditTaskDialog } from '@/app/todos/components/dialog/edit-todo-dialog';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Toaster } from 'sonner';
vitest.mock('@/service/todos', () => ({
    updateTodo: vitest.fn(),
}));

describe('EditTaskDialog', () => {
    const mockDispatch = vi.fn();

    const mockTodo: Todo = {
        id: '1',
        name: 'Test Todo',
        priority: 'low',
        dueDate: new Date('2025-05-02').toISOString(),
        done: 'false',
        doneDate: null,
        creationDate: Date.now().toLocaleString()
    };

    const preloadedState = {
        todos: { todos: [mockTodo], isTodoAdded: false },
        edit: { edit: true, id: '1' },
        todoBody: { name: '', dueDate: '', priority: '' },
    };

    const store = configureStore({
        reducer: {
            create: createTSlice.reducer,
            edit: editSlice.reducer,
            delete: deleteSlice.reducer,
            todoBody: todoBodySlice.reducer,
            todos: todosSlice.reducer,
            metrics: metricsSlice.reducer,
            pagination: paginationSlice.reducer
        },
        preloadedState
    });

    beforeEach(() => {
        // Reset store state before each test
        store.dispatch(setTodos([mockTodo]));
    });

    it('renders the dialog when editing a task', async () => {
        render(
            <Provider store={store}>
                <EditTaskDialog />
            </Provider>
        );

        // Verify if the input fields are rendered
        // Confirm the dialog title is present
        expect(screen.getByRole('button', { name: /edit to-do/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /edit to-do/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toHaveValue('Test Todo');
        expect(screen.getByText('Due Date')).toBeInTheDocument();
        const priorityLabels = screen.getAllByText(/priority/i);
        expect(priorityLabels.length).toBeGreaterThan(0);


        // Check that the initial todo data is displayed
        expect(screen.getByDisplayValue(mockTodo.name)).toBeInTheDocument();
    });

    it('allows the user to edit the task and save changes', async () => {
        render(
            <Provider store={store}>
                <EditTaskDialog />
            </Provider>
        );

        const dueDateInput = screen.getAllByRole('button')[0];

        // Simulate changes
        await userEvent.clear(screen.getByTestId(/name/i));
        await userEvent.type(screen.getByTestId(/name/i), 'Updated Todo');

        // Assuming DatePickerDemo updates the due date when selecting a new date
        // Mock the behavior of DatePicker
        const mockDueDate = '';
        fireEvent.change(dueDateInput, { target: { value: mockDueDate } });

        // Find and click the save button
        await userEvent.click(screen.getByRole('button', { name: /edit to-do/i }));
        
        // Wait for the update to happen
        await waitFor(() => {
            // Ensure the action was dispatched
            expect(store.getState().todos.todos[0].name).toBe('Updated Todo');
            expect(store.getState().todos.todos[0].dueDate).toBe(mockDueDate);
        });
    });

    it('displays an error if required fields are empty', async () => {
        store.dispatch(openEdit(mockTodo.id))

        render(
            <Provider store={store}>
                <Toaster />
                <EditTaskDialog />
            </Provider>
        );
        // Clear the name and priority
        await userEvent.clear(screen.getByTestId(/name/i));

        // Simulate clicking save button
        await userEvent.click(screen.getByRole('button', { name: /edit to-do/i }));

        // Check that error message is displayed
        await waitFor(() => {
            expect(screen.getByText(/Something went wrong, please fill all fields marked with */i)).toBeInTheDocument();
        });
    });
});
