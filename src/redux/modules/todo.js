import { configureStore, create,createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


export const __getTodoThunk = createAsyncThunk(
  "GET_TODO",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/todolist');
      console.log(response.data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __addTodoThunk = createAsyncThunk(
  "ADD_TODO",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post('http://localhost:3001/todolist', arg);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __deleteTodoThunk = createAsyncThunk(
  "DELETE_TODO",
  async (arg, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/todolist/1/checktodos/${arg}`);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updatedoneTodoThunk = createAsyncThunk(
  "UPDATE_TODO",
  async (arg, thunkAPI) => {
    try {
      const response = await axios.patch(`http://localhost:3001/todolist/${arg.id}`, {done:arg.done});
      return thunkAPI.fulfillWithValue(response.data.done);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __updateTodoThunk = createAsyncThunk(
  "UPDATE_TODO",
  async (arg, thunkAPI) => {
    try {
      const response = await axios.patch(`http://localhost:3001/todolist/${arg.id}`, {...arg,done:(arg.done)});
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  todos: [],
  error: null,
  isLoading: false,
  isSuccess: false,
};

export const todos = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodo: (state, action) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [__getTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
      console.log(action.payload);
    },
    [__getTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodoThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      const updatedTodo = action.payload;
      const todoIndex = state.todo.findIndex((todo) => todo.id === updatedTodo.id);
      state.todos[todoIndex] = updatedTodo;
    },
    [__updateTodoThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addTodoThunk.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__addTodoThunk.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.todos.push(action.payload);
    },
    [__addTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodoThunk.fulfilled]: (state, action) => {
      const target = state.todos.todolist[0].checktodos.findIndex((todo) => todo.id === action.payload)
      state.todos.todolist[0].checktodos.splice(target, 1);
    },
    [__deleteTodoThunk.rejected]: () => {},
    [__deleteTodoThunk.pending]: () => {},
  },
});

export const { clearTodo } = todos.actions;
export default todos.reducer;