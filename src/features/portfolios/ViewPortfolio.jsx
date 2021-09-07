import React from 'react';
import { useSelector } from 'react-redux';
import { AircraftView } from '../aircraft/AircraftView';
import {
  Container,
  Title,
  Section,
  Button,
} from '../../components';

export const ViewPortfolio = ({ match }) => {
  const { portfolioId } = match.params;
  const portfolio = useSelector(state => state.portfolios.data.find(portfolio => portfolio.id === portfolioId));
  const { title, selectedAircraft } = portfolio;

  if (!portfolio) {
    return (
      <Container>
        <Title>404 Error</Title>
        <Section>Portfolio not found</Section>
      </Container>
    );
  }

  return (
    <Container>
      <Section>
        <p>To generate random flight data, click this button</p>
        <Button>Generate Flight Data</Button>
      </Section>
      <Title>{title}</Title>
      <Section>
          <AircraftView aircraft={selectedAircraft} />
      </Section>
      <Section>
        <h3>Flight Data:</h3>
      </Section>
    </Container>
  );
};
