import React from 'react';
import { useSelector } from 'react-redux';
import { selectAirports } from './airportsSlice';
import styled from 'styled-components';

const White = styled.span`
  color: white;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  margin: 0.2rem 0;
  width: 50%;
  border: 1px solid #222;
  border-radius: 2px;
  background-color: black;
  font-size: 0.8rem;
`;

const countries = new Intl.DisplayNames(['en'], {type: 'region'});

export const Flight = ({flight}) => {

  const {
    flight_number: flightNumber,
    registration: regCode,
    departure_airport: departureAirport,
    departure_timestamp: departureTimestamp,
    arrival_airport: arrivalAirport,
    arrival_timestamp: arrivalTimestamp,
  } = flight;

  const airports = useSelector(selectAirports);
  const departureAirportDetails = airports.data.find(airport => airport.iata === departureAirport);
  const arrivalAirportDetails = airports.data.find(airport => airport.iata === arrivalAirport);
  
  const travelSeconds =
  (new Date(arrivalTimestamp).getTime() -
    new Date(departureTimestamp).getTime()) /
  1000;
  const secondsDate = new Date(null);
  secondsDate.setSeconds(travelSeconds);
  const duration = secondsDate.toISOString().substr(11, 8);

  return (
    <StyledContainer>
      <div>
        <White>Flight Number:</White> {flightNumber} <White>Registration:</White> {regCode}
      </div>
      <div>
        <White>Departure:</White> {departureAirportDetails.name} - {countries.of(departureAirportDetails.iso)}
      </div>
      <div>
        <White>Departure Time</White> {new Date(departureTimestamp).toString()}
      </div>
      <div>
        <White>Arrival:</White> {arrivalAirportDetails.name} - {countries.of(arrivalAirportDetails.iso)}
      </div>
      <div>
        <White>Arrival Time</White> {new Date(arrivalTimestamp).toString()}
      </div>
      <div>
        <White>Duration:</White> {duration}
      </div>
    </StyledContainer>
  );
}
