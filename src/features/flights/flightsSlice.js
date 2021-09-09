import { createSlice } from '@reduxjs/toolkit';
import {
  getLastAirport,
  selectRandomAirport,
  calculateDistance,
  calculateTime,
  kmPerHourToMetersPerSecond,
} from './utils';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    addFlight: (state, action) => {
      // get regCode, flights, airport from action.payload
      const { aircraft, flights, airports } = action.payload;
      const { regCode } = aircraft;

      const { speed } = aircraft.type;
      const metersPerSecond = kmPerHourToMetersPerSecond(speed);
      console.log('metersPerSecond', metersPerSecond);

      // get last airport or random airport for aircraft
      const departure = getLastAirport(regCode, flights, airports);
      const { airport: departureAirport, timestamp: departureTimestamp } =
        departure;
      console.log('departureTimestamp', departureTimestamp);
      console.log(new Date(departureTimestamp));

      // // get next airport
      const arrivalAirport = selectRandomAirport(airports);
      console.log('arrivalAirport', arrivalAirport);

      // calculate distance
      const distance = calculateDistance(
        departureAirport.lat,
        departureAirport.lon,
        arrivalAirport.lat,
        arrivalAirport.lon
      );
      console.log('distance', distance);

      // Calculate Time to Travel
      const timeToTravel = calculateTime(distance, metersPerSecond);
      console.log('time', timeToTravel);

      const aircraftRestTime = 3600; // 1 hour
      const arrivalTimestamp =
        departureTimestamp + aircraftRestTime + timeToTravel;

      console.log('arrivalTimestamp', arrivalTimestamp);
      console.log(new Date(arrivalTimestamp));

      // Fake Flight Number
      const flightNumber = `${departureAirport.iata}${arrivalAirport.iata}-${regCode}`;
      console.log('flightNumber', flightNumber);

      // push object to state
      const flight = {
        flight_number: flightNumber,
        registration: regCode,
        departure_airport: departureAirport.iata,
        departure_timestamp: departureTimestamp,
        arrival_airport: arrivalAirport.iata,
        arrival_timestamp: arrivalTimestamp,
      };

      console.log('flight', flight);

      state.data.push(flight);
    },
  },
});

export const { flightsPerAircraft, addFlight } = flightsSlice.actions;

export const selectFlights = (state) => state.flights;

export default flightsSlice.reducer;
