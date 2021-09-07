import React, { useState, useEffect } from 'react';
import { Aircraft } from '../aircraft/Aircraft';
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
  Section
} from '../../components';
import styled from 'styled-components';

const Title = styled.h2`
  display: flex;
  justify-content: center;
`;

export const AddPortfolio = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const aircraft = useSelector(selectAllAircraft);
  const portfolios = useSelector(selectAllPortfolios);

  const [title, setTitle] = useState('');
  const [selectedAircraft, setSelectedAircraft] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canSave = Boolean(title) && Boolean(selectedAircraft.length !== 0);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const regCode = event.target.value;
    if (selectedAircraft.includes(regCode)) {
      setSelectedAircraft(selectedAircraft.filter(aircraft => aircraft !== regCode));
    } else {
      setSelectedAircraft([...selectedAircraft, regCode]);
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    dispatch(addPortfolio({
      title,
      selectedAircraft,
    }));
  };

  useEffect(() => {
    setIsLoading(aircraft.status === 'loading' || portfolios.status === 'loading');
    if (isSubmitted && aircraft.status !== 'loading' && portfolios.status !== 'loading') {
      history.push('/portfolios');
    }
  }, [portfolios.status, aircraft.status, isLoading, isSubmitted, history]);

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
      <Title>Add Portfolio</Title>
      {
        isLoading
        // || portfolios.status === 'loading'
          ? <Loader />
          :
          <Section>
            <Form onSubmit={handleFormSubmit}>
              <div>Portfolio Title:</div>
              <Input type="text" value={title} placeholder="Please enter a title" onChange={handleTitleChange} />
              <Aircraft aircraft={aircraft} selectedAircraft={selectedAircraft} checkboxChange={handleCheckboxChange} />
              <Button type="submit" disabled={!canSave}>Submit</Button>
            </Form>
          </Section>
      }
    </Container>
  );
};
