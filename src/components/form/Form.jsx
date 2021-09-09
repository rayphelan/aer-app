import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const Form = ({children, onSubmit}) => {
  return (
    <StyledForm onSubmit={onSubmit}>{ children }</StyledForm>
  );
};
