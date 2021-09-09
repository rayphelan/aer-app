import React, { useState, useEffect } from 'react';
import { AircraftSelect } from '../aircraft/AircraftSelect';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllAircraft, fetchAircraft } from '../aircraft/aircraftSlice';
import { editPortfolio, selectAllPortfolios } from './portfoliosSlice';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Input,
  Loader,
  Form,
  Button,
  Section,
  Title,
} from '../../components';

export const EditPortfolio = ({ match }) => {
  const { portfolioId } = match.params;

  const history = useHistory();
  const dispatch = useDispatch();

  const aircraft = useSelector(selectAllAircraft);
  const portfolios = useSelector(selectAllPortfolios);
  const portfolio = useSelector((state) =>
    state.portfolios.data.find((portfolio) => portfolio.id === portfolioId)
  );

  const [title, setTitle] = useState(portfolio.title);
  const [selectedAircraft, setSelectedAircraft] = useState(
    portfolio.selectedAircraft
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canSave = Boolean(title.trim());

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const regCode = event.target.value;
    const aircraftDetails = aircraft.data.find(
      (aircraft) => aircraft.regCode === regCode
    );
    if (selectedAircraft.includes(aircraftDetails)) {
      setSelectedAircraft(
        selectedAircraft.filter((aircraft) => aircraft !== aircraftDetails)
      );
    } else {
      setSelectedAircraft([...selectedAircraft, aircraftDetails]);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    dispatch(
      editPortfolio({
        id: portfolioId,
        title,
        selectedAircraft,
      })
    );
  };

  useEffect(() => {
    setIsLoading(
      aircraft.status === 'loading' || portfolios.status === 'loading'
    );
    if (
      isSubmitted &&
      aircraft.status !== 'loading' &&
      portfolios.status !== 'loading'
    ) {
      history.push(`/portfolios/${portfolioId}`);
    }
  }, [
    portfolios.status,
    aircraft.status,
    isLoading,
    isSubmitted,
    history,
    portfolioId,
  ]);

  useEffect(() => {
    const noAircraftLoaded = aircraft?.data.length === 0;
    if (noAircraftLoaded) {
      dispatch(fetchAircraft());
    } else {
      setIsLoading(false);
    }
  }, [dispatch, aircraft]);

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
      <Title>Edit</Title>
      {isLoading ? (
        <Loader />
      ) : (
        <Section>
          <Form onSubmit={handleFormSubmit}>
            <div>Portfolio Title:</div>
            <Input
              type="text"
              value={title}
              placeholder="Please enter a title"
              onChange={handleTitleChange}
            />
            <Container>
              <AircraftSelect
                aircraft={aircraft}
                selectedAircraft={selectedAircraft}
                checkboxChange={handleCheckboxChange}
              />
            </Container>
            <Section>
              <Button type="submit" disabled={!canSave}>
                Save
              </Button>
              {
                !canSave &&
                <p>The minimum requirements for a Portfolio is a Title</p>
              }
            </Section>
          </Form>
        </Section>
      )}
    </Container>
  );
};
