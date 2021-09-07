import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 50%;
  margin: 0;
  padding: 1rem;
`;

export const Button = ({children}) => {
  return (
    <StyledButton>{ children }</StyledButton>
  );
};
