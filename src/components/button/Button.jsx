import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 50%;
  margin: 0;
  padding: 0.5rem;
  text-transform: uppercase;
  border: 1px solid rgba(173, 255, 47, 0.5);
  background-color: #222;
  border-radius: 4px;
  margin: 0 1rem;
  color: greenyellow;
  min-width: 100px;
  &:hover {
    border-color: white;
  }
  &:active {
    color: black;
    font-weight: bold;
    background-color: #45ff2f;
  }
  &:disabled {
    color: orange;
    text-decoration: line-through;
  }
`;

export const Button = ({children, disabled}) => {
  return (
    <StyledButton disabled={disabled}>{ children }</StyledButton>
  );
};
