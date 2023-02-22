import React from 'react';
import styled from 'styled-components';
import TodoHead from './TodoHead.jsx'
import TodoList from './TodoList.jsx'
import TodoAdd from './TodoAdd.jsx'

const TodoLayoutStyle = styled.div`
  width: 512px;
  height: 768px;
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  
`;

function Layout({ children }){
    return(
        
        <TodoLayoutStyle >
            { children }
        </TodoLayoutStyle>
        
    
    )
}

export default Layout;