import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers.type';
import { Review } from '../types/reviews.type';
import { SortType } from '@consts/consts';

export const setOffers = createAction<Offer[]>('offers/setOffers');
export const setReviews = createAction<Review[]>('reviews/setReviews');
export const changeCity = createAction<string>('city/changeCity');
export const setSortType = createAction<SortType>('sort/setSortType');
