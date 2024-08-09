import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

// Cria a store
const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

// Tipos para o dispatch e o estado
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; // Define RootState
export default store;
