import React, { useState,useEffect } from "react";
import { MdDone,MdOutlineNavigateBefore,MdDoneOutline } from 'react-icons/md';
import styled,{css, createGlobalStyle } from "styled-components";
import Layout from '../components/Layout';
import { Link } from "react-router-dom";
import { __getTodoThunk,__addTodoThunk } from '../redux/modules/todo';
import { useDispatch } from 'react-redux';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemStyle = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;



const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  
`;

const TodoListStyle = styled.div`
  text-align:center;
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow: hidden;
  
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  margin-right: 20px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
`;

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #38d9a9;
  color: #38d9a9;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  
  
`;

const AddFormPosition = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const AddFormStyle = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const AddListInput = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;
const List = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const AddButtonWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: row;
margin-bottom: 30px;
padding-top: 30px;

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
const AddButtonTitle = styled.h1`
  text-align: center;
  margin: 0;
  flex: 1;
`;



function AddList() {

  const [date, setDate] = useState("");
  const [formatDate,setFormatDate] = useState('');
  const [input1,setInput1] = useState('');
  const [input2,setInput2] = useState('');
  const [input3,setInput3] = useState('');
  const [input4,setInput4] = useState('');
  const [input5,setInput5] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getTodoThunk());
    ;
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit form data
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setDate(e.target.value);
    const selectedDate = new Date(e.target.value);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const formattedDate = `${year}년${month}월${day}일`;
    setFormatDate(formattedDate);
  };


  const handleAddClick = () => {
    dispatch(__addTodoThunk({day:formatDate,checktodos:[{id:1,todo:input1},{id:2,todo:input2},{id:3,todo:input3},{id:4,todo:input4},{id:5,todo:input5}]}))
    
    alert('등록완료');
  };


  return (
    <>
      <GlobalStyle />
      <Layout>
        <TodoListStyle>
          <AddButtonWrapper>
            <AddButton to="showtodo"><MdOutlineNavigateBefore/></AddButton>
            <AddButtonTitle>리스트 추가</AddButtonTitle>
          </AddButtonWrapper>
          <AddFormStyle onSubmit={handleSubmit}>
            <InputWrapper>
              <InputLabel htmlFor="date">날짜</InputLabel>
              <Input
                type="date"
                id="date"
                value={date}
                onChange={handleInputChange}
              />
            </InputWrapper>
            <List>
            <CheckCircle ><MdDone/></CheckCircle>
            <AddListInput value={input1}
            placeholder="할 일을 입력해주세요."
            onChange={(e) => setInput1(e.target.value)}
            >
            </AddListInput>

            </List>
            <List>
            <CheckCircle ><MdDone/></CheckCircle>
            <AddListInput value={input2}
            placeholder="할 일을 입력해주세요."
            onChange={(e) => setInput2(e.target.value)}
            >
            </AddListInput>

            </List>
            <List>
            <CheckCircle ><MdDone/></CheckCircle>
            <AddListInput value={input3}
            placeholder="할 일을 입력해주세요."
            onChange={(e) => setInput3(e.target.value)}
            >
            </AddListInput>

            </List>
            <List>
            <CheckCircle ><MdDone/></CheckCircle>
            <AddListInput value={input4}
            placeholder="할 일을 입력해주세요."
            onChange={(e) => setInput4(e.target.value)}
            >
            </AddListInput>
            </List>

            <List>
            <CheckCircle ><MdDone/></CheckCircle>
            <AddListInput value={input5}
            placeholder="할 일을 입력해주세요."
            onChange={(e) => setInput5(e.target.value)}
            >
            </AddListInput>
            </List>
            <AddButtonWrapper>
                <AddButtonTitle />
                <AddButton onClick={handleAddClick}>
                  <MdDoneOutline />
                </AddButton>
              </AddButtonWrapper>
          </AddFormStyle>
        </TodoListStyle>
      </Layout>
    </>
);
}

export default AddList;