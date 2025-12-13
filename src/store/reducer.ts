import { createReducer } from '@reduxjs/toolkit';
import { setOffers, changeCity, setReviews, setSortType, requireAuthorization, setError, setOffersDataLoadingStatus } from './action';
import { Offer } from '../types/offers.type';
import { Review } from '../types/reviews.type';
import { AuthStatus, SortType } from '@consts/consts';


type StateType = {
  city: string;
  offers: Offer[];
  reviews: Review[];
  sortType: SortType;
  authorizationStatus: AuthStatus;
  error: string | null;
  isOffersDataLoading: boolean;
};

const initialState: StateType = {
  city: 'Paris',
  offers: [],
  reviews: [],
  sortType: SortType.Popular,
  authorizationStatus: AuthStatus.UNKNOWN,
  error: null,
  isOffersDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setSortType, (state, { payload }) => {
      state.sortType = payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
