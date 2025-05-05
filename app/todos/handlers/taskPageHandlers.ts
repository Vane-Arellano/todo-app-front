import { toast } from "sonner";
import { Pagination, Todo, TodosResponse } from "../interfaces/todos";
import { Dispatch, SetStateAction } from "react";
import { getTodos } from "../service/todos";
import { UnknownAction } from "@reduxjs/toolkit";
import { setTodos, setTotalPages, setTotalTodos } from "@/redux/store";
/**
 * Fetches todos from the backend and updates the Redux store and local loading state.
 * Used on main Task Page component 
 * @see TaskPage
 * @param {Dispatch<SetStateAction<boolean>>} params.setLoading - React state setter for loading state.
 * @param {Pagination} params.pagination - Pagination information (e.g., current page).
 * @param {Dispatch<UnknownAction>} params.dispatch - Redux dispatch function.
 */

export const fetchTodos = async (
  { setLoading, pagination, dispatch }:
    {
      setLoading: Dispatch<SetStateAction<boolean>>,
      pagination: Pagination,
      dispatch: Dispatch<UnknownAction>,
    }
) => {
  try {
    setLoading(true);
    const data: TodosResponse = await getTodos(pagination.pageIndex);

    dispatch(setTodos(data.todos));
    dispatch(setTotalPages(data.totalPages));
    dispatch(setTotalTodos(data.totalTodos))
    setLoading(false);

  } catch (e) {
    toast('Somewthing went wrong ' + e);
  }

}; 