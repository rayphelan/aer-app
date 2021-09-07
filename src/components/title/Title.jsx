import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h2`
  display: flex;
  justify-content: center;
`;

export const Title = ({children}) => {
  return (
    <StyledTitle>{ children }</StyledTitle>
  );
};
