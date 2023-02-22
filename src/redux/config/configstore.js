import { configureStore } from "@reduxjs/toolkit";
import todos from "./../modules/todos.js";

import todo from "./../modules/todo.js";


const store = configureStore({
  reducer: {
    todos,
    
    todo,
  }
  
});

export default store;