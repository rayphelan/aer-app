import { configureStore } from '@reduxjs/toolkit';
import aircraftReducer from '../features/aircraft/aircraftSlice';

export const store = configureStore({
  reducer: {
    aircraft: aircraftReducer,
  },
});
