import { toast } from "sonner";
import { TodoBodyState } from "../interfaces/todos";

/**
 * Fetches a paginated list of todos.
 * @param {number} page - The page number to fetch.
 * @returns {Promise<any>} The list of todos.
 * @throws Will throw an error if the request fails.
 */
export const getTodos = async (page: number): Promise<any> => {
    try {
        const api_url = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${api_url}?page=${page}&size=10`);
        const todos = await response.json();
        return todos;
    } catch (error) {
        console.error('Error fetching todos:', error);
        toast.error('Failed to fetch todos');
        throw error;
    }
};

/**
 * Creates a new todo.
 * @param {TodoBodyState} newTodo - The new todo data.
 * @returns {Promise<any>} The created todo.
 * @throws Will throw an error if the request fails.
 */
export const createNewTodo = async (newTodo: TodoBodyState): Promise<any> => {
    try {
        const api_url = process.env.NEXT_PUBLIC_API_URL;
        const newTodoResponse = await fetch(`${api_url}`, {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const todo = await newTodoResponse.json();
        return todo;
    } catch (error) {
        console.error('Error creating new todo:', error);
        toast.error('Failed to create new todo');
        throw error;
    }
};

/**
 * Updates an existing todo.
 * @param {string} id - The ID of the todo to update.
 * @param {TodoBodyState} todoBody - The updated todo data.
 * @returns {Promise<boolean>} True if the update was successful.
 * @throws Will throw an error if the request fails.
 */
export const updateTodo = async (id: string, todoBody: TodoBodyState): Promise<boolean> => {
    try {
        const api_url = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${api_url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(todoBody),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Failed to update todo');
        return response.ok;
    } catch (error) {
        console.error('Error updating todo:', error);
        toast.error('Failed to update todo');
        throw error;
    }
};

/**
 * Changes the status of a todo.
 * @param {string} id - The ID of the todo to change status.
 * @returns {Promise<boolean>} True if the status change was successful.
 * @throws Will throw an error if the request fails.
 */
export const changeTodoStatus = async (id: string): Promise<boolean> => {
    try {
        const api_url = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${api_url}/${id}/changeStatus`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Failed to change todo status');
        return response.ok;
    } catch (error) {
        console.error('Error changing todo status:', error);
        toast.error('Failed to change todo status');
        throw error;
    }
};

/**
 * Deletes a todo.
 * @param {string} id - The ID of the todo to delete.
 * @returns {Promise<boolean>} True if the deletion was successful.
 * @throws Will throw an error if the request fails.
 */
export const deleteTodo = async (id: string): Promise<boolean> => {
    try {
        const api_url = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${api_url}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete todo');
        return response.ok;
    } catch (error) {
        console.error('Error deleting todo:', error);
        toast.error('Failed to delete todo');
        throw error;
    }
};