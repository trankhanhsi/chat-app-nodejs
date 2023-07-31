import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";

export const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
      <span>Đăng xuất</span>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #377dff;
  border: none;
  cursor: pointer;
  color: #ffffff;
  &:hover,
  &:focus {
    background-color: #2c64cc;
    color: #edeff2;
  }
  svg {
    font-size: 1rem;
  }
  span {
    padding-top: 3px;
    padding-left: 5px;
    text-transform: uppercase;
  }
`;
