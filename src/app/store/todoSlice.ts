import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../service/api-service';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  searchTerm: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  searchTerm: '',
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const todos = await getTodos();
  return todos;
});

export const createTodo = createAsyncThunk('todos/createTodo', async (todo: { title: string; description: string }) => {
  const newTodo = await addTodo(todo.title, todo.description);
  return newTodo;
});

export const editTodo = createAsyncThunk('todos/editTodo', async (params: { id: number; updates: Partial<{ title: string; description: string; completed: boolean }> }) => {
  const updatedTodo = await updateTodo(params.id, params.updates);
  return updatedTodo;
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id: number) => {
  await deleteTodo(id);
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch todos';
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index >= 0) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(removeTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      });
  },
});

export const { setSearchTerm } = todoSlice.actions;
export default todoSlice.reducer;
