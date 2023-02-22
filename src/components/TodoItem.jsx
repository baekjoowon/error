
import React, { useState } from "react";
import styled,{ css } from "styled-components";
import { useDispatch } from "react-redux";
import { MdDone, MdDelete,MdOutlineDoneOutline,MdOutlineCancel } from "react-icons/md";
import { __deleteTodoThunk, __updateTodoThunk,__updatedoneTodoThunk } from "./../redux/modules/todo.js";


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

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
  cursor: pointer;
`;

const Modal = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const ModalInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  font-size: 16px;
`;

const ModalButton = styled.button`
  padding: 7px 30px;
  margin-right:20px;
  border-radius: 5px;
  font-size: 24px;
  background-color: #38d9a9;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #63e6be;
  }
`;

const ButtonDiv = styled.div`
  margin-left:20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
`

function TodoItem(props) {

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTodoTitle, setEditedTodoTitle] = useState(props.todo.title);

  const handleTextClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleModalInputChange = (e) => {
    setEditedTodoTitle(e.target.value);
  };

  const handleModalCompleteButtonClick = () => {
    dispatch(
      __updateTodoThunk({
        ...props.todo,
        title: editedTodoTitle,
        
      })
      );
setIsModalOpen(false);
};

const handleModalCancelButtonClick = () => {
setEditedTodoTitle(props.todo.title);
setIsModalOpen(false);
};

const handleDeleteButtonClick = () => {
dispatch(__deleteTodoThunk(props.todo.id));
};

return (
  <TodoItemStyle>
     <CheckCircle onClick={(e)=>{

      e.stopPropagation();
      dispatch(__updatedoneTodoThunk(props.todo.id))
      }}
       done = {props.todo.done}>
        {props.todo.done && <MdDone />

      }
     </CheckCircle>
    <Text done={props.todo.done} onClick={(e) => handleTextClick(e)}>
    {props.todo.todo}
    </Text>
    <Remove onClick={() => handleDeleteButtonClick()}>
    <MdDelete />
    </Remove>
      <Modal isOpen={isModalOpen}>
      <ModalInput value={editedTodoTitle} onChange={(e) => handleModalInputChange(e)} />
      <ButtonDiv>
      <ModalButton onClick={() => handleModalCompleteButtonClick()}>
        <MdOutlineDoneOutline/>
      </ModalButton>
      <ModalButton onClick={() => handleModalCancelButtonClick()}>
        <MdOutlineCancel/>
      </ModalButton>
      </ButtonDiv>
      </Modal>
  </TodoItemStyle>
);
}

export default TodoItem;
