import { configureStore } from '@reduxjs/toolkit';
import aircraftReducer from '../features/aircraft/aircraftSlice';
import portfoliosRecuder from '../features/portfolios/portfoliosSlice';

export const store = configureStore({
  reducer: {
    aircraft: aircraftReducer,
    portfolios: portfoliosRecuder,
  },
});
