import { createSelector } from '@reduxjs/toolkit';
import type { OfferDataState, State } from '@types';
import { NameSpace } from '@consts/consts';

export const selectOfferDataState = (state: State): OfferDataState => state[NameSpace.Offer];

export const selectOfferById = createSelector(
  [selectOfferDataState],
  (offerData) => offerData.offerById
);

export const selectNearbyOffers = createSelector(
  [selectOfferDataState],
  (offerData) => offerData.nearbyOffers
);
