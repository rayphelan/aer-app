import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAirports, selectAirports } from './airportsSlice';
import { selectAllAircraft, fetchAircraft } from '../aircraft/aircraftSlice';
import { selectFlights, addFlight } from './flightsSlice';
import { Container, Title, Loader, Section, Button } from '../../components';
import { Flight } from './Flight';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  border: 2px solid red;
`;

export const FlightDataGenerator = () => {
  const dispatch = useDispatch();

  const flights = useSelector(selectFlights);
  const airports = useSelector(selectAirports);
  const aircraft = useSelector(selectAllAircraft);

  const [isLoading, setIsLoading] = useState(false);

  const fly = (reg) => {
    const aircraftFlying = aircraft.data.find(({ regCode}) => regCode === reg);
    console.log('Flying', aircraftFlying);
    dispatch(addFlight({
      aircraft: aircraftFlying,
      flights: flights.data,
      airports: airports.data,
    }));
  }

  useEffect(() => {
    const loadAirports = () => {
      setIsLoading(true);
      dispatch(fetchAirports());
    };
    const loadAircraft = () => {
      setIsLoading(true);
      dispatch(fetchAircraft());
    };
    if (airports?.data?.length === 0) {
      loadAirports();
    }
    if (aircraft?.data?.length === 0) {
      loadAircraft();
    }
    setIsLoading(
      airports.status === 'loading' || aircraft.status === 'loading'
    );
  }, [airports, aircraft, dispatch]);

  useEffect(() => {
    console.log('flights', flights);
  }, [flights]);

  return (
    <Container>
      <Title>Flight Data Generator</Title>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Container>
            {aircraft.data.map(({ regCode }) => {
              return (
                <Container key={regCode}>
                  <Section key={`aircraft-${regCode}`}>
                    {regCode}: 
                    <Button onClick={() => fly(regCode)}>Fly</Button>
                    {
                      flights.data.map((flight) => {
                        return flight.registration === regCode && <Flight flight={flight} key={flight.flight_number} />
                      })
                    }
                  </Section>
                </Container>
              );
            })}
          </Container>
        
        </>
      )}
    </Container>
  );
};
