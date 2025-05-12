import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as redux from "react-redux";
import { vi } from "vitest";
import { deleteTodoReducer, closeDelete, createTSlice, deleteSlice, editSlice, metricsSlice, paginationSlice, todoBodySlice, todosSlice } from "@/redux/store";
import { AlertDelete } from "@/app/todos/components/dialog/confirm-delete";
import *  as todoService from "@/app/todos/service/todos";
import { configureStore } from "@reduxjs/toolkit";
import '@testing-library/jest-dom';


const preloadedState = {
    delete: { delete: true, id: "1", },
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

describe("AlertDelete", () => {
    const dispatch = vi.fn();

    vi.mock('react-redux', () => ({
        useDispatch: vi.fn(),
        useSelector: vi.fn(),
        Provider: vi.fn(),
    }));

    beforeEach(() => {
        vi.clearAllMocks();

        vi.spyOn(redux, "useDispatch").mockReturnValue(dispatch);
        vi.spyOn(redux, "useSelector").mockImplementation((selector) =>
            selector({
                delete: {
                    delete: true,
                    id: "1",
                },
            })
        );
        vi.spyOn(todoService, "deleteTodo").mockResolvedValue(true);
    });
    console.log('STORE ===================================',store.getState())

    it("renders delete confirmation dialog", () => {
        render(
                <AlertDelete />
        );
        expect(screen.getByTestId("confirm-delete")).toBeInTheDocument();
    });

    it("calls deleteTodoReducer and deleteTodo on 'Continue'", async () => {
        render(<AlertDelete />);
        const continueButton = screen.getByText("Continue");
        await userEvent.click(continueButton);

        expect(dispatch).toHaveBeenCalledWith(deleteTodoReducer("1"));
        expect(todoService.deleteTodo).toHaveBeenCalledWith("1");
    });

    it("calls closeDelete when dialog is closed", async () => {
        render(<AlertDelete />);
        // simulate closing the dialog (trigger onOpenChange)
        const cancelButton = screen.getByText("Cancel");
        await userEvent.click(cancelButton);

        expect(dispatch).toHaveBeenCalledWith(closeDelete());
    });
});
