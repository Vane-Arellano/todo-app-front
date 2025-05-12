import { vi, describe, it, expect, beforeEach, afterEach, Mock } from 'vitest';
import TaskPage from '../app/todos/page'
import { render, screen, waitFor } from '@testing-library/react'
import * as todosService from '../app/todos/service/todos'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'
import '@testing-library/jest-dom';
import { setTodos, setTotalPages, setTotalTodos } from '@/redux/store';
import { Todo } from '@/app/todos/interfaces/todos';


// Mock the react-redux hooks
vi.mock('react-redux', () => ({
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
}));

// Mock the todos service
vi.mock('../app/todos/service/todos', () => ({
    getTodos: vi.fn(),
}));

// Mock sonner toast
vi.mock('sonner', () => ({
    toast: vi.fn(),
}));


// Reset mocks before each test
beforeEach(() => {
    vi.clearAllMocks()
})

describe('TaskPage Component', () => {
    const mockDispatch = vi.fn();
    const mockUseSelector = useSelector as unknown as Mock;
    const mockGetTodos = todosService.getTodos as Mock;
    const mockToast = toast as unknown as Mock;
  
    beforeEach(() => {
      (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
      mockDispatch.mockClear();
      mockToast.mockClear();
    });
  
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    it('should show loading spinner when loading', () => {
      mockUseSelector.mockImplementation((selectorFn) => {
        const fakeState = {
            pagination: { pageIndex: 1, totalPages: 5, totalTodos: 50 },
            todos: { todos: [], isTodoAdded: false },
            delete: { delete: false, id: '' }, 
          };
          return selectorFn(fakeState);
      });
  
      render(<TaskPage />);
  
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    
    it('should fetch todos on mount and dispatch actions', async () => {
        const mockTodos: Todo[] = [
            { 
                id: '1', 
                name: 'Test Todo', 
                priority: 'low', 
                dueDate: null, 
                done: 'false', 
                doneDate: null, 
                creationDate: Date.now().toLocaleString()
            }];
        mockUseSelector.mockImplementation((selectorFn) => {
            const fakeState = {
              pagination: { pageIndex: 1, totalPages: 5, totalTodos: 50 },
              todos: { todos: mockTodos, isTodoAdded: false },
              delete: { delete: false, id: '' }, 
            };
            return selectorFn(fakeState);
          });
      
        // Mock the resolved value for getTodos
        mockGetTodos.mockResolvedValue({
          todos: mockTodos,
          totalPages: 5,
          totalTodos: 50,
        });
      
        render(<TaskPage />);
      
        await waitFor(() => {
          expect(mockGetTodos).toHaveBeenCalled(); 
        });
      
        expect(mockDispatch).toHaveBeenCalledWith(setTodos(mockTodos));
        expect(mockDispatch).toHaveBeenCalledWith(setTotalPages(5));
        expect(mockDispatch).toHaveBeenCalledWith(setTotalTodos(50));
    });

    it('should add a task with correct structure', async () => {
        const mockTodos = [
            {
              id: '1',
              name: 'Test Todo', 
              priority: 'low',
              dueDate: null,
              done: 'false',
              doneDate: null,
              creationDate: new Date().toLocaleString()
            }
          ];
        
          mockUseSelector.mockImplementation((selectorFn) => {
            const fakeState = {
              pagination: { pageIndex: 1, totalPages: 5, totalTodos: 50 },
              todos: { todos: mockTodos, isTodoAdded: false },
              delete: { delete: false, id: '' },
            };
            return selectorFn(fakeState);
          });
        
          mockGetTodos.mockResolvedValue({
            todos: mockTodos,
            totalPages: 5,
            totalTodos: 50,
          });
        
          render(<TaskPage />);

          expect(await screen.findByText((content) => content.includes('Test Todo'))).toBeInTheDocument();
    });

    it('should not add a Task with incorrect structure', async () => {
        const mockTodos = [
          {
            id: '1',
            title: 'Test Todo', // Invalid: should be `name`
            priority: 'low',
            dueDate: null,
            done: 'false',
            doneDate: null,
            creationDate: new Date().toLocaleString()
          }
        ];
      
        mockUseSelector.mockImplementation((selectorFn) => {
          const fakeState = {
            pagination: { pageIndex: 1, totalPages: 5, totalTodos: 50 },
            todos: { todos: mockTodos, isTodoAdded: false },
            delete: { delete: false, id: '' },
          };
          return selectorFn(fakeState);
        });
      
        mockGetTodos.mockResolvedValue({
          todos: mockTodos,
          totalPages: 5,
          totalTodos: 50,
        });
      
        render(<TaskPage />);
      
        expect(screen.queryByText((text) => text.includes('Test Todo'))).not.toBeInTheDocument();
      });
      
})
