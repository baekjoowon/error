import React  from "react";
import TodoItem from './TodoItem';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


function TodoList(){


  
  const todos = useSelector((state) => state.todo.todos);
 

    return(
        
        <TodoListStyle>
          {
            
            todos.map((chekitem)=>{
            return(
              <TodoItem key={chekitem.id} todo={chekitem}/>
            )
          })
          }
        </TodoListStyle>
        
    )
}

export default TodoList;

const TodoListStyle = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;