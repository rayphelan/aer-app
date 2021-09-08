import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllAirports } from './airportsAPI';

export const fetchAirports = createAsyncThunk(
  'flights/fetchAirports',
  async () => {
    const response = await fetchAllAirports();
    return response.data;
  }
);

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const airportsSlice = createSlice({
  name: 'airports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirports.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAirports.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = JSON.parse(action.payload);
      });
  },
});

export const selectAirports = (state) => state.airports;

export default airportsSlice.reducer;
