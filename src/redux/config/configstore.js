import { configureStore } from "@reduxjs/toolkit";


import todo from "./../modules/todo.js";


const store = configureStore({
  reducer: {
    
    
    todo,
  }
  
});

export default store;