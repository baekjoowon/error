import React from 'react';
import styled from 'styled-components';
import { AiOutlineDoubleRight,AiOutlineDoubleLeft } from "react-icons/ai";
import { useParams, useNavigate } from 'react-router-dom';


function Layout({ children }){

    const { id } = useParams();
    const parsedId = parseInt(id);
    const navigate = useNavigate();

    // const handleRightArrowClick = () => {
    //     const nextUrl = `/showtodo/${parsedId + 1}`;
    //     console.log(nextUrl);
    //     navigate(nextUrl);
    // };


    return(
        <TodoLayoutStyle >
            <LeftArrow><AiOutlineDoubleLeft/></LeftArrow>
            <RightArrow ><AiOutlineDoubleRight/></RightArrow>
            { children }
        </TodoLayoutStyle>
    )
}

export default Layout;

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

const LeftArrow = styled.button`
  position: absolute;
  top: 50%;
  left: -40px;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;

const RightArrow = styled.button`
  position: absolute;
  top: 50%;
  right: -40px;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;