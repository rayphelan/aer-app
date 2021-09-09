import React from 'react';
import { Container, Section } from '../../components';

export const Home = () => {
  return (
    <Container>
      <Section>
        <h1>Aer App</h1>
        <p>
          Air App demonstrates how to use the latest Redux design pattern with Slices.
        </p>
        <p>
          It uses both synchronous and asynchronous functionalities.
        </p>
        <p>
          Create Portfolios of aircraft and generate flight data for each aircraft to view a line chart related to each Portfolio.
        </p>
      </Section>
    </Container>
  );
};
