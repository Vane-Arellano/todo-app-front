// __tests__/components/dialog/new-todo-dialog.test.tsx
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
    createTSlice,
    deleteSlice,
    editSlice,
    metricsSlice,
    paginationSlice,
    todoBodySlice,
    todosSlice,
    triggerTodoAdded,
    restartTodoValues,
    setTodos,
    addTodo,
    placePriority,
    placeName
} from '@/redux/store';
import { configureStore } from '@reduxjs/toolkit';
import { NewTodoDialog } from '@/app/todos/components/dialog/new-todo-dialog';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Toaster } from 'sonner';
import { vitest } from 'vitest';

vitest.mock('@/service/todos', () => ({
    createNewTodo: vitest.fn(() => Promise.resolve({
        id: '1',
        name: 'Test Todo',
        priority: 'low',
        dueDate: null,
        done: 'false',
        doneDate: null,
        creationDate: new Date().toISOString()
    }))
}));

const preloadedState = {
    todos: { todos: [], isTodoAdded: false },
    edit: { edit: false, id: '' },
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

describe('NewTodoDialog', () => {
    beforeEach(() => {
        store.dispatch(restartTodoValues());
    });

    it('renders and opens the dialog', async () => {
        render(
            <Provider store={store}>
                <NewTodoDialog />
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /new to-do/i }));
        expect(screen.getByRole('heading', { name: /new to-do/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getAllByText(/priority/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/due date/i).length).toBeGreaterThan(0);
    });

    it('displays an error if required fields are empty', async () => {
        render(
            <Provider store={store}>
                <Toaster />
                <NewTodoDialog />
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /new to-do/i }));
        fireEvent.click(screen.getByRole('button', { name: /save to-do/i }));

        await waitFor(() => {
            expect(screen.getByText(/please fill all fields marked with \*/i)).toBeInTheDocument();
        });
    });

    it('creates a new todo when valid', async () => {
        

        render(
            <Provider store={store}>
                <NewTodoDialog />
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /new to-do/i }));

        store.dispatch(placeName('New Todo'))
        store.dispatch(placePriority('low'))

        // click save
        await userEvent.click(screen.getByRole('button', { name: /save to-do/i }));

        await waitFor(() => {
            expect(store.getState().todos.todos.length).toBe(1);
            expect(store.getState().todos.todos[0].name).toBe('New Todo');
        });
    });
});
