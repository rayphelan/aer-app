import React from 'react';
import { Container } from '../../components';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  justify-content: center;
  margin: 100px auto;

  @media only screen and (min-width: 499px) {
    h1 {
      padding: 100px;
    }
  }
`;

export const Portfolios = () => {
  return (
    <Container>
      <Section>
        <h1>Portfolios</h1>
      </Section>
    </Container>
  );
};
