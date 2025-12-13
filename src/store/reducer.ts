import { createReducer } from '@reduxjs/toolkit';
import { setOffers, changeCity, setReviews, setSortType, requireAuthorization, setUser, setError, setOffersDataLoadingStatus, setOfferById, setNearbyOffers } from './action';
import { Offer } from '../types/offers.type';
import { Review, User } from '../types/reviews.type';
import { AuthStatus, SortType } from '@consts/consts';


type StateType = {
  city: string;
  offers: Offer[];
  reviews: Review[];
  sortType: SortType;
  authorizationStatus: AuthStatus;
  user: User | null;
  error: string | null;
  isOffersDataLoading: boolean;
  offerById: Offer | null;
  nearbyOffers: Offer[];
};

const initialState: StateType = {
  city: 'Paris',
  offers: [],
  reviews: [],
  sortType: SortType.Popular,
  authorizationStatus: AuthStatus.UNKNOWN,
  user: null,
  error: null,
  isOffersDataLoading: false,
  offerById: null,
  nearbyOffers: [],
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
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferById, (state, action) => {
      state.offerById = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    });
});
