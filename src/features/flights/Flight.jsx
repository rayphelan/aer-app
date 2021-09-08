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
  padding: 1rem;
  margin: 0.5rem;
  width: 50%;
  border: 1px solid #222;
  background-color: black;
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

  console.log('flight', flight);
  const airports = useSelector(selectAirports);
  const departureAirportDetails = airports.data.find(airport => airport.iata === departureAirport);
  const arrivalAirportDetails = airports.data.find(airport => airport.iata === arrivalAirport);
  const travelTime = arrivalTimestamp - departureTimestamp;
  const travelDate = new Date(null);
  travelDate.setSeconds(travelTime);
  const duration = travelDate.toISOString().substr(11, 8)
  return (
    <StyledContainer>
      <div>
        <White>Flight Number:</White> {flightNumber} <White>Registration:</White> {regCode}
      </div>
      <div>
        <White>Departure:</White> {departureAirportDetails.name} - {countries.of(departureAirportDetails.iso)}
      </div>
      <div>
        <White>Arrival:</White> {arrivalAirportDetails.name} - {countries.of(arrivalAirportDetails.iso)}
      </div>
      <div>
        <White>Duration:</White> {duration}
      </div>
    </StyledContainer>
  );
}
