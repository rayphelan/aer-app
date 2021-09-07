import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Title,
  Section,
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
      <Title>Delete</Title>
      <Section></Section>
    </Container>
  );
};
