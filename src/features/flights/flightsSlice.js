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
      // console.log('metersPerSecond', metersPerSecond);

      // get last airport or random airport for aircraft
      const departure = getLastAirport(regCode, flights, airports);
      const { airport: departureAirport, timestamp: departureTimestamp } =
        departure;
      console.log('departureTimestamp', departureTimestamp);
      const DEPDATE = new Date(departureTimestamp);
      console.log('DEPDATE', DEPDATE);

      // // get next airport
      const arrivalAirport = selectRandomAirport(airports);

      // calculate distance
      const distance = calculateDistance(
        departureAirport.lat,
        departureAirport.lon,
        arrivalAirport.lat,
        arrivalAirport.lon
      );

      // Calculate Time to Travel
      const secondsToTravel = calculateTime(distance, metersPerSecond) * 1000;
      console.log('seconds to travel', secondsToTravel);

      const arrdate = new Date(departureTimestamp);
      const arrivalTimestamp = arrdate.getTime() + secondsToTravel;
      const ARRDATE = new Date(arrivalTimestamp);
      console.log('arrivalTimestamp', arrivalTimestamp);
      console.log('ARRIVAL', ARRDATE);

      const travelSeconds =
        (new Date(arrivalTimestamp).getTime() -
          new Date(departureTimestamp).getTime()) /
        1000;

      console.log(
        'traveSeconds',
        travelSeconds,
        travelSeconds / 60,
        travelSeconds / 60 / 60
      );

      const travelDate = new Date(null);
      travelDate.setSeconds(travelSeconds);
      const duration = travelDate.toISOString().substr(11, 8);
      console.log('DURATION', duration);

      // Fake Flight Number
      const flightNumber = `${departureAirport.iata}${arrivalAirport.iata}-${regCode}`;
      // console.log('flightNumber', flightNumber);

      // push object to state
      const flight = {
        flight_number: flightNumber,
        registration: regCode,
        departure_airport: departureAirport.iata,
        departure_timestamp: departureTimestamp,
        arrival_airport: arrivalAirport.iata,
        arrival_timestamp: arrivalTimestamp,
      };

      state.data.push(flight);
    },
  },
});

export const { flightsPerAircraft, addFlight } = flightsSlice.actions;

export const selectFlights = (state) => state.flights;

export default flightsSlice.reducer;
