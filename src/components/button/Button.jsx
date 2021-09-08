import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 50%;
  margin: 0;
  padding: 0.5rem;
  text-transform: uppercase;
  border: 1px solid rgba(7, 120, 240, 0.5);
  background-color: #222;
  border-radius: 2px;
  margin: 0 1rem;
  color: rgba(7, 120, 240, 1);
  min-width: 100px;
  &:hover {
    border-color: white;
  }
  &:active {
    color: black;
    font-weight: bold;
    background-color: rgba(7, 120, 240, 1);
  }
  &:disabled {
    color: grey;
    border-color: red;
    cursor: not-allowed;
  }
`;

export const Button = ({children, disabled, onClick}) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>{ children }</StyledButton>
  );
};
