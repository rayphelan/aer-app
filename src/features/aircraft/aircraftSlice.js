import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllAircraft } from './aircraftAPI';

export const fetchAircraft = createAsyncThunk(
  'aircraft/fetchAircraft',
  async () => {
    const response = await fetchAllAircraft();
    return response.data;
  }
);

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const aircraftSlice = createSlice({
  name: 'aircraft',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAircraft.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAircraft.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      });
  },
});

export const selectAllAircraft = (state) => state.aircraft;

export default aircraftSlice.reducer;
