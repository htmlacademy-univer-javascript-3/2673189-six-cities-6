import { createReducer } from '@reduxjs/toolkit';
import { setOffers, changeCity, setReviews, setSortType } from './action';
import { Offer } from '../types/offers.type';
import { Review } from '../types/reviews.type';
import { offers } from '@mocks/offers';
import { reviews } from '@mocks/reviews';
import { SortType } from '@consts/consts';


type StateType = {
  city: string;
  offers: Offer[];
  reviews: Review[];
  sortType: SortType;
};

const initialState: StateType = {
  city: 'Paris',
  offers: [],
  reviews: [],
  sortType: SortType.Popular
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffers, (state) => {
      state.offers = offers;
    })
    .addCase(setReviews, (state) => {
      state.reviews = reviews;
    })
    .addCase(setSortType, (state, { payload }) => {
      state.sortType = payload;
    });
});
