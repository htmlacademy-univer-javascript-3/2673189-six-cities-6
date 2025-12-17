import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Offer, OffersDataState } from '@types';

const initialState: OffersDataState = {
  offers: [],
  isOffersDataLoading: false,
};

export const offersDataSlice = createSlice({
  name: 'offersData',
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
    },
    setOffersDataLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isOffersDataLoading = action.payload;
    },
  },
});

export const { setOffers, setOffersDataLoadingStatus } = offersDataSlice.actions;
