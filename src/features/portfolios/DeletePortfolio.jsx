import React, { useState, useEffect } from 'react';
import { AircraftView } from '../aircraft/AircraftView';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllAircraft, fetchAircraft } from '../aircraft/aircraftSlice';
import { deletePortfolio, selectAllPortfolios } from './portfoliosSlice';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Loader,
  DeleteButton,
  Section,
  Title,
  Links,
  Form,
} from '../../components';

export const DeletePortfolio = ({ match }) => {
  const { portfolioId } = match.params;

  const history = useHistory();
  const dispatch = useDispatch();

  const aircraft = useSelector(selectAllAircraft);
  const portfolios = useSelector(selectAllPortfolios);
  const portfolio = useSelector(state => state.portfolios.data.find(portfolio => portfolio.id === portfolioId));

  // const { title, selectedAircraft } = portfolio;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    dispatch(deletePortfolio({
      id: portfolioId,
    }));
  };

  useEffect(() => {
    setIsLoading(aircraft.status === 'loading' || portfolios.status === 'loading');
    if (isSubmitted && aircraft.status !== 'loading' && portfolios.status !== 'loading') {
      history.push(`/portfolios`);
    }
  }, [portfolios.status, aircraft.status, isLoading, isSubmitted, history, portfolioId]);

  useEffect(() => {
    const noAircraftLoaded = aircraft?.data.length === 0;
    if (noAircraftLoaded) {
      dispatch(fetchAircraft());
    }
    else {
      setIsLoading(false);
    }
  }, [dispatch, aircraft]);

  return (
    <Container>
    <Title>Confirm Delete</Title>
    {
      isLoading
        ? <Loader />
        :
        <>
          <Section>
            
            <Form onSubmit={handleFormSubmit}>
              <DeleteButton type="submit">Delete Portfolio</DeleteButton>
              <Section>
                <p>Click here if you wish to cancel</p>
              </Section>
            <Links to="/portfolios">Do not delete</Links>
            </Form>


          </Section>
          <Container>
            <Title>{portfolio?.title}</Title>
            <Section>
                <AircraftView aircraft={portfolio?.selectedAircraft} />
            </Section>
          </Container>
        </>
    }
  </Container>
  );
};