import React, { useEffect, useState } from "react";
import TodoItem from './TodoItem';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { MdCheck } from 'react-icons/md';



const TodoListStyle = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;



function TodoList(){

  const dispatch = useDispatch();
  // const { id } = useParams();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState("");
  
  const todos = useSelector((state) => state.todo.todos[0]);
  // const error = useSelector((state) => state.todo.error);

    return(
        
        <TodoListStyle>
          
          {
            
            todos.checktodos.map((chekitem)=>{
            console.log(todos);
            return(
              <TodoItem key={chekitem.id} todo={chekitem}/>
            )
          })
          }
        </TodoListStyle>
        
    )
}

export default TodoList;