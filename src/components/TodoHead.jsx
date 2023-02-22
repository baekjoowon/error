import { Link } from "react-router-dom";
import styled from 'styled-components';
import { MdPostAdd } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux';


const TodoHeadStyle = styled.div`
  
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;

  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }

  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
`;

const DateAddDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TasksLeft = styled.div`
  color: #20c997;
  font-size: 18px;
  margin-top: 40px;
  font-weight: bold;
`;

const AddButton = styled(Link)`
  text-Decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 30px;
  color: white;
  border-radius: 20%;
  background-color: #38d9a9;
  cursor: pointer;
  transition: 0.125s all ease-in;
  &:hover {
    background-color: #63e6be;
  }
  &:active {
    background-color: #20c997;
  }
`;


function TodoHead(){
  const todo = useSelector((state) => state.todo.todos[0]);
  
  return(
    <TodoHeadStyle>
      <DateAddDiv>
        <h1>{todo.day}</h1>
        <AddButton to="/"><MdPostAdd/></AddButton>
      </DateAddDiv>
      <div className='day'>토요일</div>
      <TasksLeft>할일 {todo.length}개 남음</TasksLeft>
    </TodoHeadStyle>
  )
}

export default TodoHead;