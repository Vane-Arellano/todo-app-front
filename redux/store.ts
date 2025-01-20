import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

const initialEditState: EditState = {
  edit: false
}

const editSlice = createSlice({
  name: 'edit', 
  initialState: initialEditState, 
  reducers: {
      openEdit: (state) => {
        state.edit = true
      }, 
      closeEdit: (state) => {
        state.edit = false 
      }
  },
})

export const {openEdit, closeEdit} = editSlice.actions

interface DeleteState {
  delete: boolean 
}

const initialDeleteState: DeleteState = {
  delete: false
}

const deleteSlice = createSlice({
  name: 'delete', 
  initialState: initialDeleteState, 
  reducers: {
      openDelete: (state) => {
        state.delete = true
      }, 
      closeDelete: (state) => {
        state.delete = false 
      }
  },
})

export const {openDelete, closeDelete} = deleteSlice.actions




const store = configureStore({
  reducer: {
    create: createTSlice.reducer,
    edit: editSlice.reducer, 
    delete: deleteSlice.reducer
  },
});

export default store;

// Define types for the Redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
