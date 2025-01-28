import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface Todo {
  id: string;
  name: string;
  priority: string;
  dueDate: string | null;
  done: string; 
  doneDate: string | null; 
  creationDate: string;
}

interface TodosState {
  todos: Todo[];
  isTodoAdded: boolean
}
const initialTodosState: TodosState = {
  todos: [],
  isTodoAdded: false
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialTodosState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload.map((todo: Todo) => ({
        ...todo,
        done: todo.done ? 'true' : 'false', 
        priority: 
          todo.priority === "low" ? '0' : 
          todo.priority === "medium" ? '1' : '2'
      }));
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload); 
    },
    triggerTodoAdded: (state) => {
      state.isTodoAdded = !state.isTodoAdded
    },
    editTodo: (state, action) => {
      const { id, name, priority, dueDate } = action.payload;

      const todoIndex = state.todos.findIndex((todo) => todo.id === id);

      if (todoIndex !== -1) {
        const updatedTodo = state.todos[todoIndex];
        updatedTodo.name = name;
        updatedTodo.priority = priority === "low" ? '0' : priority === "medium" ? '1' : '2';
        updatedTodo.dueDate = dueDate ?? null;
      }
    },
    changeStatus: (state, action: PayloadAction<{ id: String }>) => {
      const { id } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo && todo.done === 'true') {
        todo.done = 'false';
      }
      else {
        todo!.done = 'true';
      }
    }, 
    deleteTodoReducer: (state, action) => {
      const id = action.payload
      state.todos = state.todos.filter(todo => todo.id !== id);
    }
  },
});

export const { setTodos, addTodo, changeStatus, editTodo, deleteTodoReducer, triggerTodoAdded } = todosSlice.actions;

export interface TodoBodyState { 
  name: string, 
  priority: string, 
  dueDate: string | null,
}

const initialTodoState: TodoBodyState = { 
  name: '', 
  priority: '',
  dueDate: null
}

const todoBodySlice = createSlice({
  name: 'newTodo', 
  initialState: initialTodoState, 
  reducers: {
    placeName: (state, action) => {
      state.name = action.payload
    },
    placePriority: (state, action) => {
      state.priority = action.payload
    },
    placeDueDate: (state, action) => {
      const newDueDate = action.payload
      state.dueDate = newDueDate
    }, 
    restartTodoValues: (state) => {
      state.name = ''
      state.priority = ''
      state. dueDate = null
    }
  }
})

export const {placeName, placePriority, placeDueDate, restartTodoValues} = todoBodySlice.actions

interface CreateState {
  create: boolean 
}

const initialCreateState: CreateState = {
  create: false
}

const createTSlice = createSlice({
  name: 'create', 
  initialState: initialCreateState, 
  reducers: {
      openCreate: (state) => {
        state.create = true
      }, 
      closeCreate: (state) => {
        state.create = false 
      }
  },
})

export const {openCreate, closeCreate} = createTSlice.actions


interface EditState {
  edit: boolean 
  id?: string 
}

const initialEditState: EditState = {
  edit: false,
  id: ''
}

const editSlice = createSlice({
  name: 'edit', 
  initialState: initialEditState, 
  reducers: {
      openEdit: (state, action) => {
        state.edit = true
        state.id = action.payload
      }, 
      closeEdit: (state) => {
        state.edit = false 
        state.id = ''
      }
  },
})

export const {openEdit, closeEdit} = editSlice.actions

interface DeleteState {
  delete: boolean 
  id: string
}

const initialDeleteState: DeleteState = {
  delete: false,
  id: ''
}

const deleteSlice = createSlice({
  name: 'delete', 
  initialState: initialDeleteState, 
  reducers: {
      openDelete: (state, action) => {
        state.delete = true
        state.id = action.payload
      }, 
      closeDelete: (state) => {
        state.delete = false 
        state.id = ''
      }
  },
})

export const {openDelete, closeDelete} = deleteSlice.actions

interface Metrics {
  generalAverage: string, 
  lowAverage: string, 
  mediumAverage: string, 
  highAverage: string
}

interface MetricsState {
  metrics: Metrics;
}


const metricsInitialState : MetricsState = { 
  metrics: {
    generalAverage: '00:00 minutes',
    lowAverage: '00:00 minutes',
    mediumAverage: '00:00 minutes',
    highAverage: '00:00 minutes'
  }
}

const metricsSlice = createSlice({
  name: 'metrics', 
  initialState: metricsInitialState, 
  reducers: {
    setMetrics: (state, action) => {
      state.metrics = action.payload
    },
  }
})

export const { setMetrics } = metricsSlice.actions


const store = configureStore({
  reducer: {
    create: createTSlice.reducer,
    edit: editSlice.reducer, 
    delete: deleteSlice.reducer, 
    todoBody: todoBodySlice.reducer, 
    todos: todosSlice.reducer,
    metrics: metricsSlice.reducer, 
    // pagination: paginationSlice.reducer
  },
});

export default store;

// Define types for the Redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
