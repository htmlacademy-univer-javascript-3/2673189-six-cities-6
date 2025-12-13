import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers.type';
import { Review } from '../types/reviews.type';
import { AuthStatus, SortType } from '@consts/consts';

export const setOffers = createAction<Offer[]>('offers/setOffers');
export const setReviews = createAction<Review[]>('reviews/setReviews');
export const changeCity = createAction<string>('city/changeCity');
export const setSortType = createAction<SortType>('sort/setSortType');


export const requireAuthorization = createAction<AuthStatus>('requireAuthorization');
export const setError = createAction<string | null>('setError');
export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');
