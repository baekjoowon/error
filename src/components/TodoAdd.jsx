import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { clearTodo, __addTodoThunk } from "./../redux/modules/todo";
import { useDispatch, useSelector } from "react-redux";

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
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

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;


function TodoAdd(){

  const [open, setOpen] = useState(false);
  const [todoInput,setInput] = useState();
  const dispatch = useDispatch();
  const onToggle = () => setOpen(!open);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(__addTodoThunk({ text: todoInput, done: false }));
    setInput("");
  };
  


    return(
      <>
      {open && (
        <AddFormPosition>
            <AddFormStyle onSubmit={handleFormSubmit}>
                <Input value={todoInput} onChange={(e)=>setInput(e.target.value)}>
                </Input>
            </AddFormStyle>
        </AddFormPosition>
        )}
        <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
    );
}

export default TodoAdd;