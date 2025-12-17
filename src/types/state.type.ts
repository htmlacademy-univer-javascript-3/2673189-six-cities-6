import { store } from '@store/index';
import { AuthStatus, SortType } from '@consts/consts';
import type { Offer, Review, User } from '@types';

export type AppDataState = {
  error: string | null;
};

export type AppProcessState = {
  city: string;
  sortType: SortType;
};

export type UserProcessState = {
  authorizationStatus: AuthStatus;
  user: User | null;
};

export type OffersDataState = {
  offers: Offer[];
  isOffersDataLoading: boolean;
};

export type OfferDataState = {
  offerById: Offer | null;
  nearbyOffers: Offer[];
};

export type ReviewsDataState = {
  reviews: Review[];
  isReviewsLoading: boolean;
  isReviewPosting: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
