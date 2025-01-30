import configureMockStore from 'redux-mock-store';
import { 
  setTodos, addTodo, changeStatus, deleteTodoReducer, editTodo, triggerTodoAdded 
} from '../redux/store';
import { setPagination, setTotalPages, setTotalTodos } from '../redux/store';
import { openCreate, closeCreate } from '../redux/store';
import { openEdit, closeEdit } from '../redux/store';
import { openDelete, closeDelete } from '../redux/store';
import { setMetrics } from '../redux/store';
import { placeName, placePriority, placeDueDate, restartTodoValues } from '../redux/store';

const mockStore = configureMockStore();

describe('Redux Store Tests', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      pagination: { pageIndex: 0, totalPages: 0, totalTodos: 0 },
      todos: { todos: [], isTodoAdded: false },
      create: { create: false },
      edit: { edit: false, id: '' },
      delete: { delete: false, id: '' },
      metrics: {
        metrics: {
          generalAverage: '00:00 minutes',
          lowAverage: '00:00 minutes',
          mediumAverage: '00:00 minutes',
          highAverage: '00:00 minutes'
        }
      },
      todoBody: { name: '', priority: '', dueDate: null }
    });
  });

  // Verificar estado inicial
  it('should have correct initial state', () => {
    const initialState = store.getState();
    expect(initialState.todos.todos).toEqual([]);
    expect(initialState.todos.isTodoAdded).toBe(false);
    expect(initialState.pagination.pageIndex).toBe(0);
    expect(initialState.create.create).toBe(false);
    expect(initialState.edit.edit).toBe(false);
    expect(initialState.delete.delete).toBe(false);
    expect(initialState.todoBody.name).toBe('');
  });

  // setTodos - Agregar múltiples todos
  it('should handle setTodos with multiple todos', () => {
    const todosData = [
      { id: '1', name: 'Test Todo 1', priority: 'medium', done: false },
      { id: '2', name: 'Test Todo 2', priority: 'high', done: false }
    ];
    store.dispatch(setTodos(todosData));
    expect(store.getActions()).toEqual([{ type: 'todos/setTodos', payload: todosData }]);
  });

  // addTodo - Agregar un nuevo todo con distintos valores
  it('should handle addTodo with different priorities', () => {
    const newTodo = { id: '3', name: 'Urgent Task', priority: 'high', done: false };
    store.dispatch(addTodo(newTodo));
    expect(store.getActions()).toEqual([{ type: 'todos/addTodo', payload: newTodo }]);
  });

  // changeStatus - Cambiar estado del todo
  it('should change todo status', () => {
    store.dispatch(changeStatus({ id: '1' }));
    expect(store.getActions()).toEqual([{ type: 'todos/changeStatus', payload: { id: '1' } }]);
  });

  // deleteTodoReducer - Eliminar un todo y verificar que el ID es el correcto
  it('should delete a todo', () => {
    store.dispatch(deleteTodoReducer('1'));
    expect(store.getActions()).toEqual([{ type: 'todos/deleteTodoReducer', payload: '1' }]);
  });

  // editTodo - Editar un todo
  it('should edit a todo', () => {
    const editedTodo = { id: '1', name: 'Updated Todo', priority: 'low', dueDate: '2024-12-01' };
    store.dispatch(editTodo(editedTodo));
    expect(store.getActions()).toEqual([{ type: 'todos/editTodo', payload: editedTodo }]);
  });

  // triggerTodoAdded - Cambiar flag de agregado
  it('should trigger isTodoAdded flag', () => {
    store.dispatch(triggerTodoAdded());
    expect(store.getActions()).toEqual([{ type: 'todos/triggerTodoAdded' }]);
  });

  // setPagination - Cambiar paginación
  it('should update pagination', () => {
    store.dispatch(setPagination(2));
    store.dispatch(setTotalPages(10));
    store.dispatch(setTotalTodos(100));
    expect(store.getActions()).toEqual([
      { type: 'pagination/setPagination', payload: 2 },
      { type: 'pagination/setTotalPages', payload: 10 },
      { type: 'pagination/setTotalTodos', payload: 100 }
    ]);
  });

  // Crear y cerrar modales de Create, Edit y Delete
  it('should open and close create modal', () => {
    store.dispatch(openCreate());
    store.dispatch(closeCreate());
    expect(store.getActions()).toEqual([
      { type: 'create/openCreate' },
      { type: 'create/closeCreate' }
    ]);
  });

  it('should open and close edit modal', () => {
    store.dispatch(openEdit('2'));
    store.dispatch(closeEdit());
    expect(store.getActions()).toEqual([
      { type: 'edit/openEdit', payload: '2' },
      { type: 'edit/closeEdit' }
    ]);
  });

  it('should open and close delete modal', () => {
    store.dispatch(openDelete('3'));
    store.dispatch(closeDelete());
    expect(store.getActions()).toEqual([
      { type: 'delete/openDelete', payload: '3' },
      { type: 'delete/closeDelete' }
    ]);
  });

  // setMetrics - Configurar métricas con diferentes valores
  it('should set metrics correctly', () => {
    const metricsData = {
      generalAverage: '15:00 minutes',
      lowAverage: '7:00 minutes',
      mediumAverage: '12:00 minutes',
      highAverage: '20:00 minutes'
    };
    store.dispatch(setMetrics(metricsData));
    expect(store.getActions()).toEqual([{ type: 'metrics/setMetrics', payload: metricsData }]);
  });

  // Pruebas de todoBodySlice (nombre, prioridad, fecha, reset)
  it('should update todo name, priority, and due date', () => {
    store.dispatch(placeName('Task Name'));
    store.dispatch(placePriority('low'));
    store.dispatch(placeDueDate('2024-12-10'));
    store.dispatch(restartTodoValues());

    expect(store.getActions()).toEqual([
      { type: 'newTodo/placeName', payload: 'Task Name' },
      { type: 'newTodo/placePriority', payload: 'low' },
      { type: 'newTodo/placeDueDate', payload: '2024-12-10' },
      { type: 'newTodo/restartTodoValues' }
    ]);
  });

  // Edge Case: Prueba con datos vacíos
  it('should handle empty values gracefully', () => {
    store.dispatch(setTodos([]));
    store.dispatch(addTodo({}));
    store.dispatch(editTodo({ id: '', name: '', priority: '', dueDate: null }));
    
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'todos/setTodos', payload: [] },
      { type: 'todos/addTodo', payload: {} },
      { type: 'todos/editTodo', payload: { id: '', name: '', priority: '', dueDate: null } }
    ]);
  });
});