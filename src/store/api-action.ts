import axios, { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '@types';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthStatus, NameSpace } from '@consts/consts';
import { UserData, User, Review } from '@types';
import type { OfferDto } from '../types/offer-dto.type';
import { adaptOfferToClient } from '@services/offer-adapter';

import { setOffers, setOffersDataLoadingStatus } from './offers-data/offers-data.slice';
import { requireAuthorization, setUser } from './user-process/user-process.slice';
import { setOfferById, setNearbyOffers } from './offer-data/offer-data.slice';
import { setReviews, setReviewsLoadingStatus, setReviewPostingStatus} from './reviews-data/reviews-data.slice';
import { setError } from './app-data/app-data.slice';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<OfferDto[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setOffers(data.map(adaptOfferToClient)));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<User>(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthStatus.AUTH));
    } catch {
      dispatch(setUser(null));
      dispatch(requireAuthorization(AuthStatus.NOAUTH));
    }
  },
);

export const loginAction = createAsyncThunk<void, UserData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    dispatch(setError(null));
    try {
      const {data} = await api.post<User>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthStatus.AUTH));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const details = (err.response?.data as unknown as { details?: Array<{ messages?: string[] }> } | undefined)?.details;
        const messages = details
          ?.flatMap((d) => d.messages ?? [])
          .filter(Boolean);

        if (messages && messages.length > 0) {
          dispatch(setError(messages.join('\n')));
        } else {
          dispatch(setError('Login failed.'));
        }
      } else {
        dispatch(setError('Login failed.'));
      }
      throw err;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUser(null));
    dispatch(requireAuthorization(AuthStatus.NOAUTH));
  },
);

export const fetchOfferByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferById',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<OfferDto>(`${APIRoute.Offers}/${offerId}`);
      dispatch(setOfferById(adaptOfferToClient(data)));
    } catch (e) {
      dispatch(setOfferById(null));
      throw e;
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, {dispatch, extra: api}) => {
    const { data } = await api.get<OfferDto[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(setNearbyOffers(data.map(adaptOfferToClient).slice(0, 3)));
  },
);

export const fetchReviewsByOfferIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviewsByOfferId',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setReviewsLoadingStatus(true));
    dispatch(setError(null));
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      dispatch(setReviews(data));
    } catch {
      dispatch(setError('Failed to load reviews.'));
      dispatch(setReviews([]));
    } finally {
      dispatch(setReviewsLoadingStatus(false));
    }
  }
);

type PostReviewPayload = {
  offerId: string;
  comment: string;
  rating: number;
};

export const postReviewAction = createAsyncThunk<Review[] | null, PostReviewPayload, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    dispatch(setReviewPostingStatus(true));
    dispatch(setError(null));

    try {
      await api.post<Review[]>(`${APIRoute.Comments}/${offerId}`, { comment, rating });

      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      dispatch(setReviews(data));

      return data;
    } catch {
      dispatch(setError('Failed to send review. Please try again.'));
      return null;
    } finally {
      dispatch(setReviewPostingStatus(false));
    }
  }
);

type ChangeFavoritePayload = {
  offerId: string;
  status: 0 | 1;
};

export const changeFavoriteStatusAction = createAsyncThunk<void, ChangeFavoritePayload, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFavoriteStatus',
  async ({ offerId, status }, { dispatch, extra: api, getState }) => {
    const { data } = await api.post<OfferDto>(`${APIRoute.Favorite}/${offerId}/${status}`);
    const updatedOffer = adaptOfferToClient(data);

    const offers = getState()[NameSpace.Offers].offers;

    dispatch(
      setOffers(
        offers.map((offer) => (offer.id === offerId ? { ...offer, isFavorite: updatedOffer.isFavorite } : offer))
      )
    );
  }
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, { dispatch, extra: api, getState }) => {
    const { data } = await api.get<OfferDto[]>(APIRoute.Favorite);
    const favoritesFromServer = data.map(adaptOfferToClient);

    const favoriteIds = new Set(favoritesFromServer.map((o) => o.id));
    const offers = getState()[NameSpace.Offers].offers;

    dispatch(
      setOffers(
        offers.map((offer) => ({
          ...offer,
          isFavorite: favoriteIds.has(offer.id),
        }))
      )
    );
  }
);
