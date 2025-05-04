
import { changeTodoStatus, createNewTodo, deleteTodo, getTodos, updateTodo } from '@/app/todos/service/todos';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';

global.fetch = vi.fn();

const API_URL = process.env.NEXT_PUBLIC_API_URL;

beforeEach(() => {
    vi.resetAllMocks();
});

describe('todos service', () => {
    it('fetches todos with correct URL and returns data', async () => {
        const mockTodos = [{ id: '1', name: 'Test' }];
        (fetch as Mock).mockResolvedValueOnce({
            json: async () => mockTodos,
        });

        const result = await getTodos(1);
        expect(fetch).toHaveBeenCalledWith(`${API_URL}?page=1&size=10`);
        expect(result).toEqual(mockTodos);
    });

    it('creates a new todo and returns the created object', async () => {
        const newTodo = { name: 'Test', dueDate: '', priority: 'low' };
        const createdTodo = { id: '123', ...newTodo };

        (fetch as Mock).mockResolvedValueOnce({
            json: async () => createdTodo,
        });

        const result = await createNewTodo(newTodo);
        expect(fetch).toHaveBeenCalledWith(`${API_URL}`, {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: { 'Content-Type': 'application/json' },
        });
        expect(result).toEqual(createdTodo);
    });

    it('updates a todo and returns true if successful', async () => {
        (fetch as Mock).mockResolvedValueOnce({ ok: true });

        const result = await updateTodo('1', {
            name: 'Updated',
            dueDate: '',
            priority: 'high',
        });

        expect(fetch).toHaveBeenCalledWith(`${API_URL}/1`, expect.objectContaining({
            method: 'PUT',
        }));
        expect(result).toBe(true);
    });

    it('changes todo status and returns true if successful', async () => {
        (fetch as Mock).mockResolvedValueOnce({ ok: true });

        const result = await changeTodoStatus('1');
        expect(fetch).toHaveBeenCalledWith(`${API_URL}/1/changeStatus`, { method: 'PATCH' });
        expect(result).toBe(true);
    });

    it('deletes a todo and returns true if successful', async () => {
        (fetch as Mock).mockResolvedValueOnce({ ok: true });

        const result = await deleteTodo('1');
        expect(fetch).toHaveBeenCalledWith(`${API_URL}/1`, { method: 'DELETE' });
        expect(result).toBe(true);
    });
});
