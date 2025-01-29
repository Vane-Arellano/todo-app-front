
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