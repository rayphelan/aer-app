import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    border: 1px solid rgba(7, 127, 240, 0.5);
    border-radius: 2px;
    background-color: rgba(17, 17, 17, 0.9);
    padding: 0 1rem 1rem 1rem;
    max-width: 88%;
    margin: 1rem auto;
`;

export const Container = ({children}) => {
  return <StyledContainer>{ children }</StyledContainer>
};
