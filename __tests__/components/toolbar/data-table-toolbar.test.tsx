import { DataTableToolbar } from "@/app/todos/components/toolbar/data-table-toolbar";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createTSlice, editSlice, deleteSlice, todoBodySlice, todosSlice, metricsSlice, paginationSlice } from "@/redux/store";

// Mock for NewTodoDialog to isolate the test
vi.mock("@/components/dialog/new-todo-dialog", () => ({
    NewTodoDialog: () => <div data-testid="new-todo-dialog">NewTodoDialog</div>,
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


// Helper function to create a faceted column mock
const createMockFacetedColumn = () => ({
    getFilterValue: () => null,
    setFilterValue: vi.fn(),
    getFacetedUniqueValues: vi.fn().mockReturnValue(new Map()),
    getFacetedMinMaxValues: vi.fn().mockReturnValue([0, 0]),
    getIsAllFilteredRowsGrouped: vi.fn().mockReturnValue(false),
    getFacetedRowModel: vi.fn().mockReturnValue({ rows: [] }),
});

describe("DataTableToolbar", () => {
    const setFilterValueSpy = vi.fn(); // shared spy

    const tableMock = {
        getState: () => ({
            columnFilters: [{ id: "name", value: "test" }],
        }),
        getColumn: (id: string) => {
            if (id === "name") {
                return {
                    getFilterValue: () => "test",
                    setFilterValue: setFilterValueSpy,
                };
            }

            if (id === "done" || id === "priority") {
                return createMockFacetedColumn();
            }

            return undefined;
        },
        resetColumnFilters: vi.fn(),
    };

    it("renders input filter and allows typing", () => {
        render(
            <Provider store={store}>
                <DataTableToolbar table={tableMock as any} />
            </Provider>
        );
        const input = screen.getByPlaceholderText("Filter to-do's...") as HTMLInputElement;
        expect(input.value).toBe("test");
    
        fireEvent.change(input, { target: { value: "new value" } });
        expect(setFilterValueSpy).toHaveBeenCalledWith("new value");
      });


    it("renders DataTableFacetedFilter for done and priority", () => {
        render(
            <Provider store={store}>
                <DataTableToolbar table={tableMock as any} />
            </Provider>
        );
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Priority")).toBeInTheDocument();
    });

    it("renders and triggers reset button when filtered", () => {
        render(
            <Provider store={store}>
                <DataTableToolbar table={tableMock as any} />
            </Provider>
        );
        const resetButton = screen.getByText(/reset/i);
        fireEvent.click(resetButton);
        expect(tableMock.resetColumnFilters).toHaveBeenCalled();
    });

    it("always renders the NewTodoDialog button", () => {
        render(
            <Provider store={store}>
                <DataTableToolbar table={tableMock as any} />
            </Provider>
        );
        expect(screen.getByTestId("new-todo-dialog")).toBeInTheDocument();
    });
});
