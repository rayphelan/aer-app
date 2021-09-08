import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.5rem;
  text-transform: uppercase;
  border: 1px solid rgba(7, 120, 240, 0.5);
  background-color: #222;
  border-radius: 2px;

  color: red;
  width: 100%;
  
  &:hover {
    border-color: white;
  }
  &:active {
    color: black;
    font-weight: bold;
    background-color: rgba(7, 120, 240, 1);
  }
`;

export const DeleteButton = ({children}) => {
  return (
    <StyledButton>{ children }</StyledButton>
  );
};
