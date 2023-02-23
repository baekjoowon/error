import { configureStore, create,createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const __getTodoThunk = createAsyncThunk(
  "GET_TODO",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_TODOS}/todolist`);
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __addTodoThunk = createAsyncThunk(
  "ADD_TODO",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_TODOS}/todolist`, arg);
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
      const response = await axios.delete(`${process.env.REACT_APP_TODOS}/todolist/${arg}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updatedoneTodoThunk = createAsyncThunk(
  "UPDATE_TODO",
  async (arg, thunkAPI) => {
    try {
      
      const response = await axios.patch(`${process.env.REACT_APP_TODOS}/todolist/${arg.id}`, {...arg,done:(!arg.done)});
      
      return thunkAPI.fulfillWithValue(response.data);
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __updateTodoThunk = createAsyncThunk(
  "UPDATE_TODO",
  async (arg, thunkAPI) => {
    try {
      console.log(arg);
      const response = await axios.patch(`${process.env.REACT_APP_TODOS}/todolist/${arg.id}`, {...arg,text:(arg.text)});
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
      const todoIndex = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      state.todos[todoIndex] = updatedTodo;
    },
    [__updateTodoThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__updatedoneTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      const updatedTodo = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      state.todos[todoIndex] = updatedTodo;
    },
    [__updatedoneTodoThunk.pending]: (state) => {
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
      const target = state.todos.findIndex((todo) => todo.id === action.payload)
      state.todos.splice(target, 1);
      // const target = state.todos.filter((todo) => todo.id === action.payload)
      // state.todos = target;
    },
    [__deleteTodoThunk.rejected]: () => {},
    [__deleteTodoThunk.pending]: () => {},
  },
});

export const { clearTodo } = todos.actions;
export default todos.reducer;