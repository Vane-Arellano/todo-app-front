import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
import { setTodos, addTodo, changeStatus, deleteTodoReducer } from '../redux/store';
import { setPagination, setTotalPages, setTotalTodos } from '../redux/store';
import { openCreate, closeCreate } from '../redux/store';
import { openEdit, closeEdit } from '../redux/store';
import { openDelete, closeDelete } from '../redux/store';
import { setMetrics } from '../redux/store';

// Aplicamos thunk para manejar acciones asincrónicas si es necesario
// const middlewares = [thunk];
const mockStore = configureMockStore();

// Crear un mock de tu store para las pruebas
describe('Redux Store Tests', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      pagination: {
        pageIndex: 0,
        totalPages: 0,
        totalTodos: 0
      },
      todos: {
        todos: [],
        isTodoAdded: false
      },
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

  it('should dispatch setTodos action correctly', () => {
    const todosData = [
      { id: '1', name: 'Test Todo', priority: 'medium', done: 'false', dueDate: null },
    ];

    store.dispatch(setTodos(todosData));
    
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'todos/setTodos', payload: todosData },
    ]);
  });

  it('should dispatch addTodo action correctly', () => {
    const newTodo = { id: '2', name: 'New Todo', priority: 'high', done: 'false', dueDate: null };
    
    store.dispatch(addTodo(newTodo));
    
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'todos/addTodo', payload: newTodo },
    ]);
  });

  it('should dispatch changeStatus action correctly', () => {
    const todoId = '1';
    
    store.dispatch(changeStatus({ id: todoId }));
    
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'todos/changeStatus', payload: { id: todoId } },
    ]);
  });

  it('should dispatch deleteTodoReducer action correctly', () => {
    const todoId = '1';
    
    store.dispatch(deleteTodoReducer(todoId));
    
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'todos/deleteTodoReducer', payload: todoId },
    ]);
  });

  it('should dispatch pagination actions correctly', () => {
    const newPage = 1;
    
    store.dispatch(setPagination(newPage));
    store.dispatch(setTotalPages(5));
    store.dispatch(setTotalTodos(20));

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'pagination/setPagination', payload: newPage },
      { type: 'pagination/setTotalPages', payload: 5 },
      { type: 'pagination/setTotalTodos', payload: 20 },
    ]);
  });

  it('should dispatch create actions correctly', () => {
    store.dispatch(openCreate());
    store.dispatch(closeCreate());

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'create/openCreate' },
      { type: 'create/closeCreate' },
    ]);
  });

  it('should dispatch edit actions correctly', () => {
    const editId = '1';
    
    store.dispatch(openEdit(editId));
    store.dispatch(closeEdit());

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'edit/openEdit', payload: editId },
      { type: 'edit/closeEdit' },
    ]);
  });

  it('should dispatch delete actions correctly', () => {
    const deleteId = '1';
    
    store.dispatch(openDelete(deleteId));
    store.dispatch(closeDelete());

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'delete/openDelete', payload: deleteId },
      { type: 'delete/closeDelete' },
    ]);
  });

  it('should dispatch metrics actions correctly', () => {
    const metricsData = {
      generalAverage: '10:00 minutes',
      lowAverage: '5:00 minutes',
      mediumAverage: '8:00 minutes',
      highAverage: '12:00 minutes'
    };
    
    store.dispatch(setMetrics(metricsData));
    
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'metrics/setMetrics', payload: metricsData },
    ]);
  });
});
