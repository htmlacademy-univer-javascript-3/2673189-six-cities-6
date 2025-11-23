import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers.type';
import { Review } from '../types/reviews.type';

export const setOffers = createAction<Offer[]>('offers/setOffers');
export const setReviews = createAction<Review[]>('reviews/setReviews');
export const changeCity = createAction<string>('city/changeCity');
