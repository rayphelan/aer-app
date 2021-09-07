import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { savePortfolio } from './portfolioAPI';

export const addPortfolio = createAsyncThunk(
  'portfolios/addPortfolio',
  async (portfolio) => {
    const response = await savePortfolio(portfolio);
    return response.data;
  }
);

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const portfoliosSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPortfolio.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPortfolio.fulfilled, (state, action) => {
        state.status = 'success';
        state.data.push(action.payload);
      });
  },
});

export const { fetchAllPortfolios } = portfoliosSlice.actions;
export const selectAllPortfolios = (state) => state.portfolios;
export default portfoliosSlice.reducer;
