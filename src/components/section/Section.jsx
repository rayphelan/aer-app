import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Section = ({children}) => {
  return (
    <StyledSection>{ children }</StyledSection>
  );
};
