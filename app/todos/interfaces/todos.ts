
export interface Todo {
  id: string;
  name: string;
  priority: string;
  dueDate: string | null;
  done: string; 
  doneDate: string | null; 
  creationDate: string;
}

export interface TodosResponse {
  todos: Todo[], 
  totalTodos: number,
  totalPages: number
}

export interface TodoBodyState { 
  name: string, 
  priority: string, 
  dueDate: string | null,
}

export interface TodosState {
  todos: Todo[];
  isTodoAdded: boolean
}

export interface Pagination {
  pageIndex: number, 
  totalPages: number, 
  totalTodos: number
}