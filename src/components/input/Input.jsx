import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 1rem;
  margin: 1rem 0;
  width: 100%;
`;

export const Input = ({placeholder, onChange}) => {
  return (
    <>
      <StyledInput placeholder={placeholder} onChange={onChange} />
    </>
  );
};
