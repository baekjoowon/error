import { configureStore, create,createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


export const __getTodoThunk = createAsyncThunk(
  "GET_TODO",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:3001/todos/");
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __addTodoThunk = createAsyncThunk(
  "ADD_TODO",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post('http://localhost:3001/todos', arg);
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
      console.log(arg);
      await axios.delete(`http://localhost:3001/todos/1/checktodos/${arg}`);
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
      const response = await axios.patch(`http://localhost:3001/todos/${arg.id}`, {done:arg.done});
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
      const response = await axios.patch(`http://localhost:3001/todos/${arg.id}`, {...arg,done:(arg.done)});
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  todo: [],
  error: null,
  isLoading: false,
};

export const todo = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodo: (state) => {
      state.todo = { id: 0, todos: "", done:false };
    },
  },
  extraReducers: {
    [__getTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
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
      state.todo[todoIndex] = updatedTodo;
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
      state.todo.push(action.payload);
    },
    [__addTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodoThunk.fulfilled]: (state, action) => {
      const target = state.todo[0].checktodos.findIndex((todo) => todo.id === action.payload)
      state.todo[0].checktodos.splice(target, 1);
    },
    [__deleteTodoThunk.rejected]: () => {},
    [__deleteTodoThunk.pending]: () => {},
  },
});

export const { clearTodo } = todo.actions;
export default todo.reducer;