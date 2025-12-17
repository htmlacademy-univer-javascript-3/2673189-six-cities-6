import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Offer, OfferDataState } from '@types';

const initialState: OfferDataState = {
  offerById: null,
  nearbyOffers: [],
};

export const offerDataSlice = createSlice({
  name: 'offerData',
  initialState,
  reducers: {
    setOfferById(state, action: PayloadAction<Offer | null>) {
      state.offerById = action.payload;
    },
    setNearbyOffers(state, action: PayloadAction<Offer[]>) {
      state.nearbyOffers = action.payload;
    },
  },
});

export const { setOfferById, setNearbyOffers } = offerDataSlice.actions;
