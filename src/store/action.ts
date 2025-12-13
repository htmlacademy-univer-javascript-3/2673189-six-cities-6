import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers.type';
import { Review, User } from '../types/reviews.type';
import { AuthStatus, SortType } from '@consts/consts';

export const setOffers = createAction<Offer[]>('offers/setOffers');
export const setReviews = createAction<Review[]>('reviews/setReviews');
export const clearReviews = createAction('reviews/clearReviews');
export const setReviewsLoadingStatus = createAction<boolean>('reviews/setReviewsLoadingStatus');
export const setReviewPostingStatus = createAction<boolean>('reviews/setReviewPostingStatus');

export const changeCity = createAction<string>('city/changeCity');
export const setSortType = createAction<SortType>('sort/setSortType');


export const requireAuthorization = createAction<AuthStatus>('requireAuthorization');
export const setUser = createAction<User | null>('user/setUser');


export const setError = createAction<string | null>('setError');
export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');
export const setOfferById = createAction<Offer | null>('offer/setOfferById');
export const setNearbyOffers = createAction<Offer[]>('offer/setNearbyOffers');
