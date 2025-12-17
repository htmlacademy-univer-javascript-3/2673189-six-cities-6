import { createSelector } from '@reduxjs/toolkit';
import type { OffersDataState, State } from '@types';
import { NameSpace } from '@consts/consts';

export const selectOffersDataState = (state: State): OffersDataState => state[NameSpace.Offers];

export const selectOffers = createSelector(
  [selectOffersDataState],
  (offersData) => offersData.offers
);

export const selectOffersDataLoadingStatus = createSelector(
  [selectOffersDataState],
  (offersData) => offersData.isOffersDataLoading
);
