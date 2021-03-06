import React, { useState, useEffect } from 'react';
import { AircraftSelect } from '../aircraft/AircraftSelect';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllAircraft, fetchAircraft } from '../aircraft/aircraftSlice';
import { addPortfolio, selectAllPortfolios } from './portfoliosSlice';
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

export const AddPortfolio = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const aircraft = useSelector(selectAllAircraft);
  const portfolios = useSelector(selectAllPortfolios);

  const [title, setTitle] = useState('');
  const [selectedAircraft, setSelectedAircraft] = useState([]);
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
      addPortfolio({
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
      history.push('/portfolios');
    }
  }, [portfolios.status, aircraft.status, isLoading, isSubmitted, history]);

  useEffect(() => {
    const noAircraftLoaded = aircraft?.data.length === 0;
    if (noAircraftLoaded) {
      dispatch(fetchAircraft());
    } else {
      setIsLoading(false);
    }
  }, [dispatch, aircraft]);

  return (
    <Container>
      <Title>Add Portfolio</Title>
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
                Submit
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
