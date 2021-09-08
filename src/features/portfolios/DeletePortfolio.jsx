import React from 'react';
import { useSelector } from 'react-redux';
import { AircraftView } from '../aircraft/AircraftView';
import {
  Container,
  Title,
  Section,
  Button,
  Links,
  Loader,
} from '../../components';

export const DeletePortfolio = ({ match }) => {
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
        <p>Do you want to delete this portfolio?</p>
        <Button>Delete Portfolio</Button>
        <p>Click here if you wish to cancel</p>
        <Links to="/portfolios">Cancel</Links>
      </Section>
      <Title>{title}</Title>
      <Section>
          <AircraftView aircraft={selectedAircraft} />
      </Section>
    </Container>
  );
};