import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';

import Layout from './../components/Layout.jsx'
import TodoHead from './../components/TodoHead.jsx'
import TodoList from './../components/TodoList.jsx'
import TodoAdd from './../components/TodoAdd.jsx'
import { createGlobalStyle } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { __getTodoThunk } from "./../redux/modules/todo.js";


const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;
function Main(){
const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const todos = useSelector((state) => state.todo.todos[0]);
  console.log(todos);
  // const { id } = useParams();

  useEffect(() => {
    dispatch(__getTodoThunk())
      
  }, [dispatch]);

 


  return(
    <>
      <GlobalStyle/>
      <Layout>
            <TodoHead/>
             <TodoList/>
            <TodoAdd/>
      </Layout>
    </>
  );
}

export default Main;
