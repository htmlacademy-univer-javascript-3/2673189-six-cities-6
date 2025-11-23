import { createReducer } from '@reduxjs/toolkit';
import { setOffers, changeCity, setReviews } from './action';
import { Offer } from '../types/offers.type';
import { Review } from '../types/reviews.type';
import { offers } from '@mocks/offers';
import { reviews } from '@mocks/reviews';


type StateType = {
  city: string;
  offers: Offer[];
  reviews: Review[];
};

const initialState: StateType = {
  city: 'Paris',
  offers: [],
  reviews: []
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
    });
});
