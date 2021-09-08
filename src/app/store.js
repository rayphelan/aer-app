import { configureStore } from '@reduxjs/toolkit';
import aircraftReducer from '../features/aircraft/aircraftSlice';
import portfoliosRecuder from '../features/portfolios/portfoliosSlice';
import airportsReducer from '../features/flights/airportsSlice';
import flightsReducer from '../features/flights/flightsSlice';

export const store = configureStore({
  reducer: {
    aircraft: aircraftReducer,
    portfolios: portfoliosRecuder,
    airports: airportsReducer,
    flights: flightsReducer,
  },
});
