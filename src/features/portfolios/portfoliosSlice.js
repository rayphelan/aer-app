import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  savePortfolio,
  updatePortfolio,
  removePortfolio,
} from './portfolioAPI';

export const addPortfolio = createAsyncThunk(
  'portfolios/addPortfolio',
  async (portfolio) => {
    const response = await savePortfolio(portfolio);
    return response.data;
  }
);

export const editPortfolio = createAsyncThunk(
  'portfolios/editPortfolio',
  async (portfolio) => {
    const response = await updatePortfolio(portfolio);
    return response.data;
  }
);

export const deletePortfolio = createAsyncThunk(
  'portfolios/deletePortfolio',
  async (portfolio) => {
    const response = await removePortfolio(portfolio);
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
      })
      .addCase(editPortfolio.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editPortfolio.fulfilled, (state, action) => {
        state.status = 'success';
        const { id, title, selectedAircraft } = action.payload;
        const portfolioFound = state.data.find(
          (portfolio) => portfolio.id === id
        );
        if (portfolioFound) {
          portfolioFound.title = title;
          portfolioFound.selectedAircraft = selectedAircraft;
        }
      })
      .addCase(deletePortfolio.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.status = 'success';
        const { id } = action.payload;
        state.data = state.data.filter((portfolio) => portfolio.id !== id);
      });
  },
});

export const selectAllPortfolios = (state) => state.portfolios;
export default portfoliosSlice.reducer;
