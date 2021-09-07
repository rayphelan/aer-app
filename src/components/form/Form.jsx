import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 50%;
  margin: 0;
  padding: 0;
`;

export const Form = ({children}) => {
  return (
    <StyledForm>{ children }</StyledForm>
  );
};
